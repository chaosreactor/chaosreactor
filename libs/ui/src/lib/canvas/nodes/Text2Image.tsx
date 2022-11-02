import { Graph, Node, NodeEvalContext, Socket, ILogger } from 'behave-graph';
import { NodeDescription } from 'behave-graph/dist/lib/Nodes/NodeDescription';

export class Text2Image extends Node {
  public static Description = new NodeDescription(
    'action/text2image',
    'Action',
    'Text 2 Image',
    (description, graph) => new Text2Image(description, graph)
  );

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'prompt')],
      [new Socket('flow', 'flow'), new Socket('string', 'image')],
      (context: NodeEvalContext) => {
        const logger =
          context.graph.registry.abstractions.get<ILogger>('ILogger');
        logger.info(context.readInput('prompt'));
      }
    );
  }
}
