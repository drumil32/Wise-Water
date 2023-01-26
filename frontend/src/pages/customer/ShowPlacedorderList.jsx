import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner';
import ShowOrder from '../shared/order/Order';
import { useNavigate } from 'react-router-dom';
import { givePlacedOrders } from '../../actions/customer/givePlacedOrders';

export default function ShowPlacedorderList({ cookies }) {
    const [placedOrderList, setPlacedOrderList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const { token } = cookies;

        const fetchData = async () => {
            setLoading(true);
            const response = await givePlacedOrders(token);
            if ('error' === response.type) {
                alert(response.error);
                navigate('/login');
            }
            setPlacedOrderList(response.orderList);
            setLoading(false);
        }
        fetchData();
    }, [cookies]);

    if (true === loading) {
        return <Spinner />
    }
    const handleTrackOrder = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        navigate(`${e.target.value}`)
    }
    return (
        <div>
            {0 === placedOrderList.length && <p>no orders placed</p>}
            {
                placedOrderList.map((order, index) => {
                    return (
                        <div key={index}>
                            <h2 >order number {index}</h2>
                            <ShowOrder order={order} />
                            {order.status !== "delievered" && order.status !== "in-query" && <button value={`/customer/order/track/${order._id}`} onClick={handleTrackOrder}>Track Order</button>}
                        </div>
                    )
                })
            }
        </div>
    )
}
