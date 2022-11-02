import {
  Graph,
  Node,
  NodeEvalContext,
  Socket,
  ILogger,
  In1Out1FuncNode,
} from 'behave-graph';
import { NodeDescription } from 'behave-graph/dist/lib/Nodes/NodeDescription';

export class Text2Image extends Node {
  public static Description = new NodeDescription(
    'action/text2image',
    'Action',
    'Text 2 Image',
    (description, graph) =>
      new In1Out1FuncNode(
        description,
        graph,
        ['string'],
        'string',
        (prompt: string) => prompt,
        ['prompt']
      )
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'prompt')],
      [new Socket('flow', 'flow')],
      (context: NodeEvalContext) => {
        const logger =
          context.graph.registry.abstractions.get<ILogger>('ILogger');
        logger.info(context.readInput('prompt'));
      }
    );
  }
}
