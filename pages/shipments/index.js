import { useState } from 'react';
import Link from 'next/link';

const LIST = [
  {
    status: 'ready',
    orderId: '009-300FCT',
    technicianName: 'Ben Santana',
    platform: 'Gamma',
    droneId: 'DJI004Q',
    technicalCheckStatus: 'passed',
  },
];

function FieldPreview({ label, value, ...other }) {
  const { valueClasses } = other;

  return (
    <div>
      <div className="is-capitalized	has-text-grey-light">{label}</div>
      <div className={`is-capitalized	${valueClasses}`}>{value}</div>
    </div>
  );
}

function SimpleDropdownButton({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`dropdown ${open ? 'is-active' : ''}`}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setOpen(!open)}
        >
          <span>{label}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">{children}</div>
      </div>
    </div>
  );
}

function SimpleDropdownMenuItem({ label, children }) {
  return (
    <a href="#" className="dropdown-item">
      {children || label}
    </a>
  );
}

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

export default function Shipments() {
  const shipments = LIST;
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
    </div>
  );
}
