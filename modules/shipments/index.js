import { useState, useEffect } from 'react';

import CreateShipmentModal from '../../modules/shipments/components/CreateShipmentModal';
import { getAllShipments, createShipment } from '../../api/resources/shipments';
import ShipmentsTable from './components/ShipmentsTable';


export default function ShipmentsMainPage() {
  const [shipments, setShipments] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  useEffect(() => {
    fetchShippments();
  }, []);

  async function fetchShippments() {
    const results = await getAllShipments();
    setShipments(results);
  }

  function toggleCreateModal(show) {
    setOpenCreateModal(show);
  }

  async function handleSaveNewDelivery(newDelivery) {
    try {
      await createShipment(newDelivery);
      fetchShippments();
      toggleCreateModal(false);
    } catch (error) {
      alert(error.message);
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
            onClick={() => toggleCreateModal(true)}
          >
            New delivery
          </button>
        </div>
      </div>
      <div className="content">
        <ShipmentsTable shipments={shipments}/>
      </div>

      <CreateShipmentModal
        open={openCreateModal}
        onCancel={() => toggleCreateModal(false)}
        onSave={handleSaveNewDelivery}
      />
    </div>
  );
}
