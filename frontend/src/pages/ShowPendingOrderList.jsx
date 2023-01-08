import { useState, useEffect } from "react";
import ShowOrder from "../components/ShowOrder";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ShowPendingOrderList({ cookies }) {
  const navigate = useNavigate();
  const [pendingOrderList, setPendingOrderList] = useState(null);
  console.log("here");
  useEffect(() => {
    const fun = async () => {
      const { token } = cookies;
      try {
        const response = await fetch(
          `http://localhost:3001/api/owner/show-pending-orders
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
        if (data.type === "error") throw new Error (data.message);
        console.log(data);
        setPendingOrderList(data.pendingOrderList);
      } catch (error) {
        toast(error);
      }
    };
    fun();
  }, []);

  if (null === pendingOrderList) {
    return <Spinner />;
  }

  const redirectHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    navigate(`${e.target.value}`);
  };
// why we delete order.status
// REASON :- in showOrder componenet there is condataion on this order.status
// when owner wants to show panding orders then there is no meansing to show order status
  return (
    <>
      {pendingOrderList.length === 0 && <>No Order found</>}
      {pendingOrderList.map((order, index) => {
        delete order.status
        return (
          
            <div key={index}>
              <h2>order number {index}</h2>
              <ShowOrder order={order} />
              <button
                onClick={redirectHandler}
                value={`/owner/show-workers/${order._id}`}
              >assign</button>
            </div>
          
        );
      })}
    </>
  );
}
