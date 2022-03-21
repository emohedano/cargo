import Link from 'next/link';

import SimpleDropdownButton from '../../../components/SimpleDropdown/SimpleDropdownButton';
import SimpleDropdownMenuItem from '../../../components/SimpleDropdown/SimpleDropdownMenuItem';
import FieldPreview from '../../../components/FieldPreview';

function ShipmentActions({ shipment, ...other }) {
  return (
    <div {...other}>
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

export default function ShipmentsTable({ shipments }) {
  return (
    <table className="table mt-6">
      <tbody>
        {shipments.map((shipment) => (
          <tr key={shipment.orderId}>
            <td>
              <FieldPreview
                label="Status"
                value={shipment.status}
                valueClasses="has-text-weight-bold"
              />
            </td>

            <td>
              <FieldPreview label="Order ID" value={shipment.orderId} />
            </td>

            <td>
              <FieldPreview
                label="Technician"
                value={shipment.technicianName}
              />
            </td>

            <td>
              <FieldPreview label="Platform" value={shipment.platform} />
            </td>

            <td>
              <FieldPreview label="Drone" value={shipment.droneId} />
            </td>

            <td>
              <FieldPreview
                label="Technical Check"
                value={shipment.technicalCheckStatus}
              />
            </td>

            <td>
              <ShipmentActions
                shipment={shipment}
                className="is-flex is-justify-content-flex-end"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
