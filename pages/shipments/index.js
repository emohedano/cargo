import { useState, useEffect } from 'react';
import Link from 'next/link';
import SimpleDropdownButton from '../../components/SimpleDropdown/SimpleDropdownButton';
import SimpleDropdownMenuItem from '../../components/SimpleDropdown/SimpleDropdownMenuItem';
import FieldPreview from '../../components/FieldPreview';
import SimpleModal from '../../components/SimpleModal';
import { getAllShipments, createShipment } from '../../api/resources/shipments';

const PLTATFORM_TYPES = ['alfa', 'beta', 'gamma'];
const DRONES_LIST = ['DJI-004Q'];

function ShipmentActions({ shipment }) {
  return (
    <div>
      <Link href={`/shipments/${shipment.orderId}`}>
        <button className="button mr-2">Details</button>
      </Link>
      <SimpleDropdownButton label="Actions">
        <SimpleDropdownMenuItem label="Edit" />
        <SimpleDropdownMenuItem>Delete</SimpleDropdownMenuItem>
      </SimpleDropdownButton>
    </div>
  );
}

function createOptions(collection) {
  return collection.map((item) => {
    return (
      <option value={item} key={item}>
        {item}
      </option>
    );
  });
}

function SimpleSelect({ label, options, value, onChange }) {
  return (
    <>
      <label>{label}</label>
      <div>
        <div className="select">
          <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option>Select option</option>
            {createOptions(options)}
          </select>
        </div>
      </div>
    </>
  );
}

function CreateShipmentModal({ open, onSave, onCancel }) {
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
      technicianName
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
          <label>Order ID</label>
          <input
            className="input"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <div className="column">
          <label>Technician</label>
          <input
            className="input"
            type="text"
            value={technicianName}
            onChange={(e) => setTechnicianName(e.target.value)}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <SimpleSelect
            label="Platform"
            value={platform}
            options={PLTATFORM_TYPES}
            onChange={(value) => setPlatform(value)}
          />
        </div>
        <div className="column">
          <SimpleSelect
            label="Drone"
            value={droneId}
            options={DRONES_LIST}
            onChange={(value) => setDroneId(value)}
          />
        </div>
      </div>
    </SimpleModal>
  );
}

export default function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  
  useEffect(() => {
    fetchShippments()
  }, []);

  function fetchShippments() {
    getAllShipments().then((results) => {
      setShipments(results);
    });
  }

  function toggleCreateModal(show) {
    setOpenCreateModal(show);
  }

  async function handleSaveNewDelivery(newDelivery) {
    try {
      await createShipment(newDelivery);
      fetchShippments()
      toggleCreateModal(false);      
    } catch (error) {
      alert(error.message)
    }    
  }

  return (
    <div className="p-6">
      <div className="is-flex is-justify-content-space-between">
        <div className="is-flex">
          <h1 className="title mr-2">Delivery</h1>
          <h1 className="title has-text-grey-light">History</h1>
        </div>
        <div className="is-flex">
          <div className="field mr-2">
            <p className="control has-icons-left">
              <input className="input" placeholder="Search" />
              <span className="icon is-left">
                <i className="fa fa-magnifying-glass"></i>
              </span>
            </p>
          </div>
          <button
            className="button is-primary"
            onClick={()=> toggleCreateModal(true)}
          >
            New delivery
          </button>
        </div>
      </div>

      <ul className="mt-6">
        {shipments.map((shipment) => (
          <>
            <li
              className="is-flex is-justify-content-space-between"
              key={shipment.orderId}
            >
              <FieldPreview
                label="Status"
                value={shipment.status}
                valueClasses="has-text-weight-bold"
              />
              <FieldPreview label="Order ID" value={shipment.orderId} />
              <FieldPreview
                label="Technician"
                value={shipment.technicianName}
              />
              <FieldPreview label="Platform" value={shipment.platform} />
              <FieldPreview label="Drone" value={shipment.droneId} />
              <FieldPreview
                label="Technical Check"
                value={shipment.technicalCheckStatus}
              />
              <ShipmentActions shipment={shipment} />
            </li>
            <hr />
          </>
        ))}
      </ul>
      <CreateShipmentModal
        open={openCreateModal}
        onCancel={() => toggleCreateModal(false)}
        onSave={handleSaveNewDelivery}
      />
    </div>
  );
}
