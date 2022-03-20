import {
  hasCollection,
  loadCollection,
  saveCollection,
} from './common/localstorage-helper';

const DEFAULT_SHIPMENTS = [
  {
    status: 'ready',
    orderId: '009-300FCT',
    technicianName: 'Ben Santana',
    platform: 'Gamma',
    droneId: 'DJI004Q',
    technicalCheckStatus: 'passed',
  },
];

const LOCAL_STORAGE_KEY = 'shippments';

function loadShipments() {
  if (!hasCollection(LOCAL_STORAGE_KEY)) {
    saveCollection(LOCAL_STORAGE_KEY, DEFAULT_SHIPMENTS);
  }

  return loadCollection(LOCAL_STORAGE_KEY);
}

export async function getAllShipments() {
  return loadShipments();
}

export async function findShipmentById(orderId) {
  const shipments = loadShipments();
  return shipments.find((shipment) => shipment.orderId === orderId) || null;
}
