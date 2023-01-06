import { TRPCError } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { Graph, ComponentLoader, internalSocket, Component } from 'noflo';
import path from 'path';

import { FilterQueryInput } from '../schemas/block.schema';
import type { BlockInterface } from '../../db/client';
import type { BlockStartedEvent } from '../bus';
import { bus, blockStarted } from '../bus';
import { ChaosReactorDB } from '../../db/data-source';
import { Block } from '../../src/entities/block';
import { EventEmitter } from 'events';

export const reactorSubscriptionController = () => {
  return observable<BlockStartedEvent>((emit) => {
    const onBlockStarted = (data: BlockStartedEvent) => {
      // emit data to client
      emit.next(data);
    };

    const handleBlockStarted = (event: unknown) => {
      const blockStartedEvent = event as BlockStartedEvent;
      console.log('blockStartedEvent', blockStartedEvent);

      const { blockId } = blockStartedEvent;
    };

    blockStarted.addListener(handleBlockStarted);

    // Unsubscribe function when client disconnects or stops subscribing
    return () => {
      blockStarted.removeListener(handleBlockStarted);
    };
  });
};

// @see https://codevoweb.com/build-a-fullstack-trpc-crud-app-with-nextjs
export const runReactorController = async ({
  filterQuery,
}: {
  filterQuery: FilterQueryInput;
}) => {
  try {
    console.log('Running reactor', filterQuery);

    const blocksRepository = ChaosReactorDB.getRepository(Block);
    const blocks = await blocksRepository.find();

    // Create a new NoFlo graph. This will be used to run the reactor.
    const graph = new Graph('reactor');

    let prompt: string;

    const baseDir = path.join(__dirname, '../../');
    // pkg will include this file in assets.
    const repeatPath = path.join(
      __dirname,
      '../../../../../node_modules/noflo-core/components/Repeat.js'
    );
    const loader = new ComponentLoader(baseDir);
    loader.listComponents((err: any, components: any) => {
      console.log('components', components);
    });
    console.log('repeatPath', repeatPath);
    loader.registerComponent('core', 'Repeat', repeatPath, (err: any) => {
      if (err) {
        console.error('Error loading Repeat component', err);
      }
    });

    // Add a core/Repeat component to the graph.
    // @see https://docs.flowhub.io/getting-started-browser/
    graph.addNode('START', 'Repeat');
    graph.addInport('in', 'START', 'in');

    // Add a node for each block.
    blocks.forEach((block) => {
      const { id, type } = block as unknown as BlockInterface;
      const data = block.data as unknown as { prompt: string };

      // Add the block to the graph.
      graph.addNode(id.toString(), 'dist/' + type);
      graph.addEdge('START', 'out', id.toString(), 'in');
      graph.addOutport('out', id.toString(), 'out');

      // Capture any prompts.
      if (data?.prompt) {
        prompt = data.prompt;
      }

      console.log('block', block);
    });

    const items = new Set();

    // Log all emitted events.
    // @see https://stackoverflow.com/a/53311946/109663
    if (process.env.DEBUG) {
      const originalEmit = EventEmitter.prototype.emit;
      EventEmitter.prototype.emit = function (
        event: string | symbol,
        ...args: any[]
      ): boolean {
        // Do what you want here
        const id = this.constructor.name + ':' + event.toString();
        if (!items.has(id)) {
          items.add(id);
          console.log('EVENT: ', id);
        }

        // And then call the original
        return originalEmit.call(this, event, ...args);
      };
    }

    loader.registerGraph('trpc', 'reactor', graph, (err) => {
      if (err) {
        console.log('Error loading reactor graph', err);
      }

      interface RuntimeGraph extends Graph {
        network: EventEmitter;
      }

      // Load the reactor graph.
      loader
        .load('trpc/reactor', {})
        .then((instance: Component) => {
          console.log('Running reactor graph...');

          // This is the only way to get the network-level events.
          const instanceGraph = instance as unknown as RuntimeGraph;
          instanceGraph.network.on('ip', (ip) => {
            console.log('network-level IP', ip);

            console.log('IP process', ip.socket.to.process);

            const startedBlockId = ip.socket.to.process.id;

            const blockStartedEvent: BlockStartedEvent = {
              blockId: startedBlockId,
            };
            blockStarted.emit(blockStartedEvent);
          });

          instance.start((err) => {
            const out = internalSocket.createSocket();
            const ins = internalSocket.createSocket();

            // Bind inport to the start node.
            instance.inPorts.ports.in.attach(ins);
            instance.outPorts.ports.out.attach(out);

            // React to results from outport
            out.on('ip', (ip) => {
              // Received an information packet
              console.log('Received output IP', ip);
            });

            ins.on('ip', (ip) => {
              // Received an information packet
              console.log('Received input IP', ip);
            });

            // Send something
            ins.send(prompt);
          });
        })
        .catch((err) => {
          console.log('Error loading reactor graph:', err);
        });
    });
    //});

    return blocks;
  } catch (error) {
    console.log('Error running reactor', error);

    throw new TRPCError({
      code: 'CONFLICT',
      message: 'Eror running reactor',
      cause: error,
    });
  }
};
