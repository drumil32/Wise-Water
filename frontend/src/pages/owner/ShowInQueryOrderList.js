import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import ShowInQueryOrders from '../../components/ShowInQueryOrders';
import { toast } from 'react-toastify';

export default function ShowInQueryOrderList({ cookies }) {
    const navigate = useNavigate();
    const [inQueryOrders, setInQueryOrders] = useState(null);
    const { token } = cookies;
    useEffect(() => {

        const fetchInQueryOrder = async () => {
            try {
                const response = await fetch('/api/owner/show-in-query-orders', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                const data = await response.json();
                console.log(data)
                if (data.type === 'error') toast.error(data.message);
                setInQueryOrders(data.inQueryOrders);
            } catch (error) {
                alert('you are not authenticated' + error);
                navigate('/login');
            }
        }
        fetchInQueryOrder();
    }, []);

    if (null === inQueryOrders) {
        return <Spinner />;
    }

    const handleRedirect = (e)=>{
        console.log(e.target);
        navigate(`${e.target.value}`);
    }

    return (
        <div>
            {0 === inQueryOrders.length && <p>no order</p>}
            {
                inQueryOrders.map((order, index) => {
                    return (
                        <div key={index}>
                            <h2>order number {index}</h2>
                            <ShowInQueryOrders order={order} />
                            <button value={`/owner/in-query-order/resolve/${order.order_id}`} onClick={handleRedirect}>Show Order</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
