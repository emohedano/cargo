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
    platform: 'gamma',
    droneId: 'DJI-004Q',
    technicalCheckStatus: 'passed',
  },
  {
    status: 'ready',
    orderId: '008-300FCT',
    technicianName: 'Juan Reynosa',
    platform: 'gamma',
    droneId: 'DJI-004Q',
    technicalCheckStatus: 'passed',
  },
  {
    status: 'ready',
    orderId: '007-300FCT',
    technicianName: 'Shan Smith',
    platform: 'gamma',
    droneId: 'DJI-004Q',
    technicalCheckStatus: 'passed',
  },
  {
    status: 'ready',
    orderId: '006-300FCT',
    technicianName: 'Gerardo Torres',
    platform: 'gamma',
    droneId: 'DJI-004Q',
    technicalCheckStatus: 'passed',
  },
  {
    status: 'ready',
    orderId: '005-300FCT',
    technicianName: 'Leonardo Flores',
    platform: 'beta',
    droneId: 'DJI-004Q',
    technicalCheckStatus: 'passed',
  },
  {
    status: 'ready',
    orderId: '004-300FCT',
    technicianName: 'Miguel Obregon',
    platform: 'beta',
    droneId: 'DJI-004Q',
    technicalCheckStatus: 'passed',
  },
  {
    status: 'ready',
    orderId: '003-300FCT',
    technicianName: 'Mariano Arribas',
    platform: 'beta',
    droneId: 'DJI-004Q',
    technicalCheckStatus: 'passed',
  },
  {
    status: 'ready',
    orderId: '002-300FCT',
    technicianName: 'Jesica Salinas',
    platform: 'alfa',
    droneId: 'DJI-004Q',
    technicalCheckStatus: 'passed',
  },
  {
    status: 'ready',
    orderId: '001-300FCT',
    technicianName: 'Ernesto Garcia',
    platform: 'alfa',
    droneId: 'DJI-004Q',
    technicalCheckStatus: 'passed',
  },
];

const LOCAL_STORAGE_KEY = 'shippments';

function loadShipments() {
  if (!hasCollection(LOCAL_STORAGE_KEY)) {
    saveShipments(DEFAULT_SHIPMENTS);
  }

  return loadCollection(LOCAL_STORAGE_KEY);
}

function saveShipments(shipments) {
  saveCollection(LOCAL_STORAGE_KEY, shipments);
}

function findById(shipments, orderId) {
  return shipments.find((shipment) => shipment.orderId === orderId) || null;
}

export async function getAllShipments() {
  return loadShipments();
}

export async function findShipmentById(orderId) {
  const shipments = loadShipments();
  return findById(shipments, orderId);
}

export async function createShipment(shipment) {
  const shipments = loadShipments();
  const shipmentExists = findById(shipments, shipment.orderId);

  if (shipmentExists) {
    throw new Error('Shipment already exists');
  }

  shipments.unshift(shipment);
  saveShipments(shipments);
}
