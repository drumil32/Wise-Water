import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from '../Spinner';
import ShowOrder from "../shared/order/Order";
import { giveDetailsToTrackOrder } from "../../actions/customer/giveDetailsToTrackOrder";

export default function TrackOrder({ cookies }) {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [showOrder, setShowOrder] = useState([]);
  const [worker, setWorker] = useState([]);
  console.log("order-id", order_id);
  useEffect(() => {

    const fetchData = async () => {
      const { token } = cookies;
      const response = await giveDetailsToTrackOrder(token, order_id);
      if ('error' === response.type) {
        alert(response.error);
        navigate('/login');
      }
      setShowOrder(response.order);
      setWorker(response.worker);
    }
    fetchData();

  }, []);

  if (null === showOrder || null == worker) {
    return <Spinner />;
  }
  return (
    <>
      {showOrder.map((order, index) => {
        return (
          <div key={index}>
            <ShowOrder order={order} />
            {order.status !== "pending" &&
              <div>
                <p>Worker name: {worker[0].firstname} {worker[0].lastname}</p>
                <p>Worker Contact: {worker[0].contact}</p>
                <p>Worker Email: {worker[0].email}</p>
              </div>
              // <ShowAssignedWorkerDetails worker={worker} />
            }
          </div>
        );
      })}
    </>
  );
}
