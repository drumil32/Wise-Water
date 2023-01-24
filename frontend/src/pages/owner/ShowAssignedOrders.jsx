import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import ShowOrder from "../shared/order/Order";
import { giveAssignedOrders } from '../../actions/owner/giveAssignedOrders';

export default function ShowAssignedOrders({ cookies }) {

    const navigate = useNavigate();
    const [assignedOrders, setAssignedOrders] = useState(null);

    useEffect(() => {
        const { token } = cookies;

        const fetchData = async () => {
            const response = await giveAssignedOrders(token);
            if ('error' === response.type) {
                alert(response.error);
                navigate('/login');
            }
            setAssignedOrders(response.assignedOrders);
        };
        fetchData();

    }, [cookies]);

    if (null === assignedOrders) {
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
