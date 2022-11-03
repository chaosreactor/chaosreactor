import { Graph, Node, NodeEvalContext, Socket, ILogger } from 'behave-graph';
import { NodeDescription } from 'behave-graph/dist/lib/Nodes/NodeDescription';

export class Image extends Node {
  public static Description = new NodeDescription(
    'action/image',
    'Action',
    'Image',
    (description, graph) => new Image(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'image')],
      [new Socket('flow', 'flow')],
      async (context: NodeEvalContext) => {
        const logger =
          context.graph.registry.abstractions.get<ILogger>('ILogger');
        const image: string = context.readInput('image');

        logger.info('from image node', image);

        context.finish();
      }
    );
  }
}
