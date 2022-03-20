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
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    saveShipments(DEFAULT_SHIPMENTS);
  }

  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  } catch (error) {
    return [];
  }
}

function saveShipments(shipments) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(shipments));
  } catch (error) {}
}

export async function getAllShipments() {
  return loadShipments();
}

export async function findShipmentById(orderId) {

    console.log('orderId', orderId);
  const shipments = loadShipments();
  return shipments.find((shipment) => shipment.orderId === orderId) || null;
}
