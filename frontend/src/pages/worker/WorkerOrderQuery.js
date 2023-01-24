import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../Spinner';
import ShowOrder from "../shared/order/Order";
import { toast } from 'react-toastify';

export default function WorkerOrderQuery({ cookies }) {
    const {order_id} = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [orderQuery, setOrderQuery] = useState('');
    const {token} = cookies;
    useEffect(() => {
        const fetchOrder = async()=>{
            try{
                const response = await fetch('/api/worker/fetch-order', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({token,order_id:order_id})
                });
                const data = await response.json();
                if (data.type === 'error') throw new Error(data.message);
                setOrder(data.order);
            }catch(e){
                toast.error(e.message);
            }
        }
        fetchOrder();
    }, [order_id, token]);

    if (null === order) {
        return <Spinner />;
    }

    const makeOrderQuery = async(x)=>{
        try{
            const response = await fetch('/api/worker/make-order-query', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token,order_id:x,query:orderQuery})
            });
            const data = await response.json();
            if (data.type === 'error') toast.error(data.message);
            console.log(data)
            navigate(`/worker/profile`);
        }catch(e){
            toast.error(e.message);
        }
    }

    const handleQuery = async(e)=>{
        console.log(e.target);
        makeOrderQuery(e.target.value);
    }
    return (
        <div>
            {0 === order.length && <p>no order</p>}
            {
                order.map((orderin, index) => {
                    return (
                        <div key={index}>
                            <h2>order number {index}</h2>
                            <ShowOrder order={orderin} />
                            Query: <textarea rows="5" cols="30" value={orderQuery} onChange={(e)=>{setOrderQuery(e.target.value)}}></textarea><br/> 
                            <button value={orderin._id} onClick={handleQuery}>Submit</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
