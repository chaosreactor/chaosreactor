import { EventBus } from 'estacion';

// Create event bus
const bus = new EventBus();

// Create channels
const blocksChannel = bus.channel('blocks');

// Create topics for the channels
const blockStarted = blocksChannel.topic('block_started');

type BlockStartedEvent = {
  blockId: string;
};

const blockEnded = blocksChannel.topic('block_ended');

export { bus, blocksChannel, blockStarted, blockEnded };
export type { BlockStartedEvent };
