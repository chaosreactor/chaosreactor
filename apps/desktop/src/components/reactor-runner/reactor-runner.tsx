import useAppStore, { AppState } from '../../../../../libs/ui/src/store';
import { Node } from 'reactflow';
import shallow from 'zustand/shallow';
import { trpc } from '../../utils/trpc';
import { CreateBlockInput, UpdateBlockInput } from '@chaosreactor/trpc';
import { useEffect, useState } from 'react';

import { events, useBus } from '../../../../../libs/ui/src/bus';

/* eslint-disable-next-line */
export interface ReactorRunnerProps {}

/**
 * Handle communication with the tRPC server by triggering runs and communicating
 * state changes back to the flow diagram.
 */
export function ReactorRunner(props: ReactorRunnerProps) {
  // Handle reactor runs.
  useBus(events.reactors.run, (input) => {
    console.log('reactor run', input);
  });

  return null;
}

export default ReactorRunner;
