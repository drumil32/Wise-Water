import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import ShowOrder from '../components/ShowOrder';


export default function ShowPlacedorderList({ cookies }) {
    const [orderList, setOrderList] = useState(null);
    console.log('here')
    useEffect(() => {
        const fun = async () => {
            const { token } = cookies;
            const response = await fetch(`http://localhost:3001/api/customer/show-placed-orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token }),
            });
            const data = await response.json();
            if (data.type === 'error') throw (data.message);
            console.log(data);
            setOrderList(data.orderList);
        }
        fun();
    }, []);

    if (null === orderList) {
        return <Spinner />
    }

    return (
        <div>
            {0 === orderList.length && <p>no orders placed</p>}
            {
                orderList.map((order, index) => {
                    return (
                        <>
                            <div key={index}>
                                <h2 >order number {index}</h2>
                                <ShowOrder order={order} />
                            </div>
                        </>
                    )
                })
            }
        </div>
    )
}
