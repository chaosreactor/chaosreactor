import useBus, { dispatch } from 'use-bus';

const events = {
  blocks: {
    // Trigger the addition of a block to the playfield.
    add: 'blocks.add',
  }
}

export { useBus, events, dispatch };
