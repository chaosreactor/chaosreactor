import useBus, { dispatch } from 'use-bus';

const events = {
  blocks: {
    add: 'blocks.add',
    update: 'blocks.update',
    run: 'blocks.run',
  }
}

export { useBus, events, dispatch };
