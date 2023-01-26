import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from '../Spinner';
import ShowOrder from "../shared/order/Order";
import { giveDetailsToTrackOrder } from "../../actions/customer/giveDetailsToTrackOrder";

export default function TrackOrder({ cookies }) {
  const { order_id } = useParams();
  const navigate = useNavigate();


  const [order, setOrder] = useState({});
  const [worker, setWorker] = useState({});
  const [loading, setLoading] = useState(true);
  console.log("order-id", order_id);
  useEffect(() => {

    const fetchData = async () => {
      const { token } = cookies;
      setLoading(true);
      const response = await giveDetailsToTrackOrder(token, order_id);
      console.log(response);
      if ('error' === response.type) {
        alert(response.error);
        navigate('/login');
      }
      setOrder(response.order);
      setWorker(response.worker);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (true === loading) {
    return <Spinner />;
  }
  return (
    <>
      {/* {showOrder.map((order, index) => { */}
        {/* return ( */}
          <div >
            <ShowOrder order={order} />
            {order.status !== "pending" &&
              <div>
                <p>Worker name: {worker.firstname} {worker.lastname}</p>
                <p>Worker Contact: {worker.contact}</p>
                <p>Worker Email: {worker.email}</p>
              </div>
              // <ShowAssignedWorkerDetails worker={worker} />
            }
          </div>
        {/* ); */}
      {/* })} */}
    </>
  );
}
