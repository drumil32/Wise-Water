import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from '../Spinner';
import { giveWorkerDetails } from "../../actions/owner/giveWorkerDetails";
import { assignOrder } from "../../actions/owner/assignOrder";

export default function ShowWorkers({ cookies }) {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [showWorkers, setShowWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(order_id);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { token } = cookies;

      const response = await giveWorkerDetails(token);

      if ('error' === response.type) {
        alert(response.error);

      } else {
        setShowWorkers(response.workers);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (true===loading) {
    return <Spinner />;
  }
  const assignHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    try {
      const { token } = cookies;
      const obj = { token, worker_id: e.target.value, order_id: order_id };
      const response = await assignOrder(obj);
      if ('error' === response.type) {
        alert(response.error);
        return;
      } else {
        navigate('/owner/show-pending-orders');
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <>
      {showWorkers.map((worker, index) => {
        return (
          <div key={index}>
            <p>{worker.firstname}</p>
            <button onClick={assignHandler} value={worker._id}>
              assign order
            </button>
          </div>
        );
      })}
    </>
  );
}
