import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import ShowOrder from "../shared/order/Order";
import { giveAssignedOrders } from '../../actions/owner/giveAssignedOrders';

export default function ShowAssignedOrders({ cookies }) {

    const navigate = useNavigate();
    const [assignedOrders, setAssignedOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const { token } = cookies;

        const fetchData = async () => {
            setLoading(true);
            const response = await giveAssignedOrders(token);
            if ('error' === response.type) {
                alert(response.error);
                navigate('/login');
            }
            setAssignedOrders(response.assignedOrders);
            setLoading(false);
        };
        fetchData();

    }, [cookies]);

    if (true===loading) {
        return <Spinner />;
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
                        </div>
                    )
                })
            }
        </div>
    )
}
