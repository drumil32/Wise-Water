import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import ShowOrder from '../../components/ShowOrder';
import { useNavigate } from 'react-router-dom';
import { givePlacedOrders } from '../../actions/orders/givePlacedOrders';

export default function ShowPlacedorderList({ cookies }) {
    const [placedOrderList, setPlacedOrderList] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const { token } = cookies;

        const fetchData = async () => {
            const response = await givePlacedOrders(token);
            if ('error' === response.type) {
                alert(response.error);
                navigate('/login');
            }
            setPlacedOrderList(response.orderList);
        }
        fetchData();
    }, [cookies]);

    if (null === placedOrderList) {
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
