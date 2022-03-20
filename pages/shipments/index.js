import { useState, useEffect } from 'react';
import Link from 'next/link';
import SimpleDropdownButton from '../../components/SimpleDropdown/SimpleDropdownButton';
import SimpleDropdownMenuItem from '../../components/SimpleDropdown/SimpleDropdownMenuItem';
import FieldPreview from '../../components/FieldPreview';
import { getAllShipments } from '../../api/resources/shipments';

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

function CreateShipmentModal() {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box">
          <div className='is-flex is-justify-content-space-between'>
            <div className="title">New delivery</div>
            <span className="icon is-large has-text-grey-light">
                <i className="fa fa-lg fa-xmark"></i>
              </span>
          </div>
          
          <div className='mb-4'>
            Please select the Order ID and a technician to deploy the cargo. All
            elements are mandatory.
          </div>
          <div className="columns">
            <div className="column">
              <label>Order ID</label>
              <input className="input" type="text" />
            </div>
            <div className="column">
              <label>Technician</label>
              <input className="input" type="text" />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <label>Platform</label>
              <div>
                <div className="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="column">
              <label>Drone</label>
              <div>
                <div className="select">
                  <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <hr/>
          <div className='is-flex is-justify-content-flex-end'>
            <button className="button mr-2">Cancel</button>
            <button className="button is-primary">Create new delivery</button>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
}

export default function Shipments() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    getAllShipments().then((results) => {
      setShipments(results);
    });
  }, []);

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
          <button className="button is-primary">New delivery</button>
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
      <CreateShipmentModal />
    </div>
  );
}
