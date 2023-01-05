import { TRPCError } from '@trpc/server';
import {
  Graph,
  isBrowser,
  ComponentLoader,
  internalSocket,
  Component,
} from 'noflo';
import path from 'path';
import fs from 'fs';

import { FilterQueryInput } from '../schemas/block.schema';
import db from '../../db/client';
import type { BlockInterface } from '../../db/client';
import Dolt from '../../db/dolt';
import { ChaosReactorDB } from '../../db/data-source';
import { Block } from '../../src/entities/block';
import { nodeHTTPRequestHandler } from '@trpc/server/dist/adapters/node-http';
import { InternalSocket } from 'noflo/lib/InternalSocket';

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
        console.log('Error loading Repeat component', err);
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

    loader.registerGraph('trpc', 'reactor', graph, (err) => {
      if (err) {
        console.log('Error loading reactor graph', err);
      }

      type InPorts = {
        in: InternalSocket;
      };

      // Load the reactor graph.
      loader
        .load('trpc/reactor', {})
        .then((instance: Component) => {
          console.log('instance', instance);
          console.log('Running reactor graph...');

          instance.start((err) => {
            // Here you can bind to ports. Using just in/out as example, but can be more
            const out = internalSocket.createSocket();
            const ins = internalSocket.createSocket();

            // Bind inport to the start node.
            console.log('inPorts', instance.inPorts);
            instance.inPorts.ports.in.attach(ins);

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
          console.error('Error loading reactor graph:', err);
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
