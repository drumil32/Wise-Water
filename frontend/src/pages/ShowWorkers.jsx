import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function ShowWorkers({ cookies }) {
  const { order_id } = useParams();
  const navigate = useNavigate();
  const [showWorkers, setShowWorkers] = useState([]);
  console.log(order_id);
  useEffect(() => {
    const fun = async () => {
      const { token } = cookies;
      const response = await fetch(
        `http://localhost:3001/api/owner/show-workers
                `,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );
      const data = await response.json();
      if (data.type === "error") throw data.message;
      console.log(data);
      setShowWorkers(data.workers);
    };
    fun();
  }, []);

  if (null === showWorkers) {
    return <Spinner />;
  }
  const assignHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    try {
        const {token} = cookies;
      const response = await fetch(
        `http://localhost:3001/api/owner/assign-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, worker_id: e.target.value, order_id:order_id }),
        }
      );
      const data = await response.json();
      if (data.error) throw new Error(data.message);
        navigate('/owner/show-pending-orders');
    } catch (error) {
      toast(error);
    }
  };
  return (
    <>
      {showWorkers.map((worker,index) => {
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
