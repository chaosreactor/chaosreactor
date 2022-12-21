import useBus, { dispatch } from 'use-bus';

const events = {
  blocks: {
    add: 'blocks.add',
    update: 'blocks.update',
  }
}

export { useBus, events, dispatch };
