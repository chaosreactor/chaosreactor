import { Graph, Node, NodeEvalContext, Socket, ILogger } from 'behave-graph';
import { NodeDescription } from 'behave-graph/dist/lib/Nodes/NodeDescription';
import { run as Banana } from '@banana-dev/banana-dev';

export class Text2Image extends Node {
  public static Description = new NodeDescription(
    'action/text2image',
    'Action',
    'Text 2 Image',
    (description, graph) => new Text2Image(description, graph)
  );

  /**
   * Generate an image from a string prompt.
   *
   * @param prompt {String}
   *  The prompt to generate an image from.
   *
   * @returns {String}
   *  The binary image data.
   */
  public static generate = async (prompt: string): Promise<string> => {
    console.log('generate', prompt);

    const apiKey = process.env['NEXT_PUBLIC_BANANA_API_KEY'] || '';
    const modelKey = process.env['NEXT_PUBLIC_BANANA_TEXT2IMAGE_KEY'] || '';
    const modelParameters = {
      prompt: 'table full of muffins',
      num_inference_steps: 50,
      guidance_scale: 9,
      height: 512,
      width: 512,
      seed: 3242,
    };

    console.log('Banana', Banana);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const out: any = await Banana(apiKey, modelKey, modelParameters);

    console.log('out', out);

    const base64 = out['modelOutputs'][0]['image_base64'];

    console.log(base64);

    return base64;
  };

  constructor(description: NodeDescription, graph: Graph) {
    super(
      description,
      graph,
      [new Socket('flow', 'flow'), new Socket('string', 'prompt')],
      [new Socket('flow', 'flow'), new Socket('string', 'image')],
      async (context: NodeEvalContext) => {
        const logger =
          context.graph.registry.abstractions.get<ILogger>('ILogger');
        const prompt: string = context.readInput('prompt');
        logger.info(prompt);
        const image: string = await Text2Image.generate(prompt);
        logger.info(image);
      }
    );
  }
}
