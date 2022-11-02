import {
  DefaultLogger,
  GraphEvaluator,
  ManualLifecycleEventEmitter,
  readGraphFromJSON,
  registerCoreProfile,
  registerSceneProfile,
  Registry,
} from 'behave-graph';
import { useState } from 'react';
import { ClearModal } from '../../../vendor/behave-flow/src/components/ClearModal';
import { HelpModal } from '../../../vendor/behave-flow/src/components/HelpModal';
import {
  faDownload,
  faPlay,
  faQuestion,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LoadModal } from '../../../vendor/behave-flow/src/components/LoadModal';
import { SaveModal } from '../../../vendor/behave-flow/src/components/SaveModal';
import { flowToBehave } from '../../../vendor/behave-flow/src/transformers/flowToBehave';
import { useReactFlow, Controls, ControlButton } from 'reactflow';

const CustomControls = () => {
  const [loadModalOpen, setLoadModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [clearModalOpen, setClearModalOpen] = useState(false);
  const instance = useReactFlow();

  const handleRun = async () => {
    const registry = new Registry();
    registerCoreProfile(registry);
    registerSceneProfile(registry);
    registry.abstractions.register('ILogger', new DefaultLogger());
    const manualLifecycleEventEmitter = new ManualLifecycleEventEmitter();
    registry.abstractions.register(
      'ILifecycleEventEmitter',
      manualLifecycleEventEmitter
    );

    const nodes = instance.getNodes();
    const edges = instance.getEdges();
    const graphJson = flowToBehave(nodes, edges);
    const graph = readGraphFromJSON(graphJson, registry);

    const graphEvaluator = new GraphEvaluator(graph);

    await graphEvaluator.executeAllSync();

    if (manualLifecycleEventEmitter.startEvent.listenerCount > 0) {
      manualLifecycleEventEmitter.startEvent.emit();
      await graphEvaluator.executeAllAsync(5);
    }

    if (manualLifecycleEventEmitter.tickEvent.listenerCount > 0) {
      const iteations = 5;
      for (let tick = 0; tick < iteations; tick++) {
        manualLifecycleEventEmitter.tickEvent.emit();
        await graphEvaluator.executeAllAsync(5);
      }
    }

    if (manualLifecycleEventEmitter.endEvent.listenerCount > 0) {
      manualLifecycleEventEmitter.endEvent.emit();
      await graphEvaluator.executeAllAsync(5);
    }
  };

  return (
    <>
      <Controls>
        <ControlButton title="Help" onClick={() => setHelpModalOpen(true)}>
          <FontAwesomeIcon icon={faQuestion} />
        </ControlButton>
        <ControlButton title="Load" onClick={() => setLoadModalOpen(true)}>
          <FontAwesomeIcon icon={faUpload} />
        </ControlButton>
        <ControlButton title="Save" onClick={() => setSaveModalOpen(true)}>
          <FontAwesomeIcon icon={faDownload} />
        </ControlButton>
        <ControlButton title="Clear" onClick={() => setClearModalOpen(true)}>
          <FontAwesomeIcon icon={faTrash} />
        </ControlButton>
        <ControlButton title="Run" onClick={() => handleRun()}>
          <FontAwesomeIcon icon={faPlay} />
        </ControlButton>
      </Controls>
      <LoadModal open={loadModalOpen} onClose={() => setLoadModalOpen(false)} />
      <SaveModal open={saveModalOpen} onClose={() => setSaveModalOpen(false)} />
      <HelpModal open={helpModalOpen} onClose={() => setHelpModalOpen(false)} />
      <ClearModal
        open={clearModalOpen}
        onClose={() => setClearModalOpen(false)}
      />
    </>
  );
};

export default CustomControls;
