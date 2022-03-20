import { useState, useEffect } from 'react';
import { findShipmentById } from '../../api/resources/shipments';
import { useRouter } from 'next/router';

export default function ShipmentDetail() {
  const [shipment, setShipment] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    findShipmentById(id).then((result) => {
      setShipment(result);
    });
  }, [id]);

  return (
    <div className="p-6">
      {shipment && (
        <div className="box">
          <div className="title">Order ID: {shipment.orderId}</div>
        </div>
      )}
    </div>
  );
}
