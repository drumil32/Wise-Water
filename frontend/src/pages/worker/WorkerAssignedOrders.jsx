import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import ShowOrder from "../shared/order/Order";
import { toast } from 'react-toastify';
import { giveWorkerAssignedOrders } from '../../actions/worker/giveWorkerAssignedOrders';
import { deliverOrder } from '../../actions/worker/deliverOrder';

export default function WorkerAssignedOrders({ cookies }) {
    const navigate = useNavigate();
    const [assignedOrders, setAssignedOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const { token } = cookies;
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await giveWorkerAssignedOrders(token);
            if ('error' === response.type) {
                alert(response.error);
                navigate('/login');
            } else {
                setAssignedOrders(response.assignedOrders);
            }
            setLoading(false);
        }
        fetchData();
    }, [token]);

    if (true === loading) {
        return <Spinner />;
    }

    const handleDelieverOrder = async (e) => {
        e.preventDefault();
        console.log(e.target.value);
        const response = await deliverOrder(token, e.target.value);
        if ('error' === response.type) {
            alert(response.error);
        } else {
            setAssignedOrders(response.assignedOrders);
        }
    }
    const handleAssignedOrderQuery = (e) => {
        e.preventDefault();
        console.log("Order no: ", e.target.value);
        navigate(`/worker/order/assigned/query/${e.target.value}`)
    }
    return (
        <div>
            {0 === assignedOrders.length && <p>no order are assigned</p>}
            {
                assignedOrders.map((assignedOrder, index) => {
                    delete assignedOrder.status
                    return (
                        <div key={index}>
                            <h2>order number {index}</h2>
                            <ShowOrder order={assignedOrder} />
                            <button onClick={handleDelieverOrder} value={`${assignedOrder._id}`}>Order Delievered</button>
                            <button value={`${assignedOrder._id}`} onClick={handleAssignedOrderQuery}>Order Query</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
