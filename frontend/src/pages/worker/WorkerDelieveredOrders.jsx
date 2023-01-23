import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import ShowOrder from "../../components/ShowOrder";
import { toast } from 'react-toastify';
import { giveWorkerDelieveredOrders } from '../../actions/orders/giveWorkerDelieveredOrders';

export default function ShowAssignedOrders({ cookies }) {
    const navigate = useNavigate();
    const { token } = cookies;
    const [delieveredOrders, setDelieveredOrders] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await giveWorkerDelieveredOrders(token);
            if( 'error'===response.type ){
                alert(response.error);
                navigate('/login');
            }else{
                setDelieveredOrders(response.delieveredOrders);
            }
        }
        fetchData();
    }, [token]);

    if (null === delieveredOrders) {
        return <Spinner />;
    }

    return (
        <div>
            {0 === delieveredOrders.length && <p>no order are assigned</p>}
            {
                delieveredOrders.map((assignedOrder, index) => {
                    delete assignedOrder.status;
                    return (
                        <div key={index}>
                            <h2>order number {index}</h2>
                            <ShowOrder order={assignedOrder} />
                        </div>
                    )
                })
            }
        </div>
    )
}
