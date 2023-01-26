import { useState, useEffect } from "react";
import ShowOrder from "../shared/order/Order";
import Spinner from '../Spinner';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { givePendingOrders } from "../../actions/owner/givePendingOrders";

export default function ShowPendingOrderList({ cookies }) {
  const navigate = useNavigate();
  const [pendingOrderList, setPendingOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("here");
  useEffect(() => {
    const { token } = cookies;

    const fetchData = async () => {
      setLoading(true);
      const response = await givePendingOrders(token);
      if ('error' === response.type) {
        alert(response.error);
        navigate('/login');
      }
      setPendingOrderList(response.pendingOrderList);
      setLoading(false);
    };
    fetchData();
  }, [cookies]);

  if (true===loading) {
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
