import { useState } from 'react';

import SimpleModal from '../../../components/SimpleModal';
import SimpleSelect from '../../../components/SimpleSelect';
import SimpleInput from '../../../components/SimpleInput';

const PLTATFORM_TYPES = ['alfa', 'beta', 'gamma'];
const DRONES_LIST = ['DJI-004Q'];

export default function CreateShipmentModal({ open, onSave, onCancel }) {
  const [orderId, setOrderId] = useState('');
  const [technicianName, setTechnicianName] = useState('');
  const [platform, setPlatform] = useState('');
  const [droneId, setDroneId] = useState('');

  function handleSave() {
    const newShippment = {
      orderId,
      status: 'ready',
      platform,
      droneId,
      technicianName,
    };
    onSave(newShippment);
  }

  return (
    <SimpleModal
      open={open}
      onClose={onCancel}
      onAccept={handleSave}
      title="New delivery"
      description="Please select the Order ID and a technician to deploy the cargo. All
      elements are mandatory."
      acceptLabel="Create new delivery"
    >
      <div className="columns">
        <div className="column">
          <SimpleInput
            label="Order ID"
            value={orderId}
            onChange={setOrderId}
          />
        </div>
        <div className="column">
          <SimpleInput
            label="Technician"
            value={technicianName}
            onChange={setTechnicianName}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <SimpleSelect
            label="Platform"
            value={platform}
            options={PLTATFORM_TYPES}
            onChange={setPlatform}
          />
        </div>
        <div className="column">
          <SimpleSelect
            label="Drone"
            value={droneId}
            options={DRONES_LIST}
            onChange={setDroneId}
          />
        </div>
      </div>
    </SimpleModal>
  );
}
