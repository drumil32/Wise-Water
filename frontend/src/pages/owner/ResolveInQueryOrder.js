import { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { toast } from 'react-toastify';
import ShowOrder from '../../components/ShowOrder';
export default function ResolveInQueryOrder({ cookies }) {
    const {order_id} = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const { token } = cookies;
    useEffect(() => {

        const fetchInQueryOrder = async () => {
            try {
                const response = await fetch('/api/owner/get-order', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token,order_id })
                });
                const data = await response.json();
                console.log(data)
                if (data.type === 'error') toast.error(data.message);
                setOrder(data.order);
            } catch (error) {
                alert('you are not authenticated' + error);
                navigate('/login');
            }
        }
        fetchInQueryOrder(order_id);
    }, []);

    if (null === order) {
        return <Spinner />;
    }

    const ReAssignOrder = async () => {
        try {
            const response = await fetch('/api/owner/reassign-order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token,order_id })
            });
            const data = await response.json();
            console.log(data)
            if (data.type === 'error') toast.error(data.message);
            navigate('/owner/show-in-query-orders');
        } catch (error) {
            alert('you are not authenticated' + error);
            navigate('/login');
        }
    }
    const MoveToPending = async () => {
        try {
            const response = await fetch('/api/owner/move-to-pending-order', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token,order_id })
            });
            const data = await response.json();
            console.log(data)
            if (data.type === 'error') toast.error(data.message);
            navigate('/owner/show-in-query-orders');
        } catch (error) {
            alert('you are not authenticated' + error);
            navigate('/login');
        }
    }

    const handleReAssign = (e)=>{
        console.log(e.target)
        ReAssignOrder();
    }
    const handleMoveToPending = (e)=>{
        MoveToPending();
    }

    const handleCustomerDetail = (e)=>{
        console.log(e.target);
        navigate(`${e.target.value}`)
    }

    return (
        <div>
            {null === order && <p>no order</p>}
            {
                order.map((orderin, index) => {
                    return (
                        <div key={index}>
                            <h2>order number {index}</h2>
                            <ShowOrder order={orderin} />
                            <button onClick={handleMoveToPending}>Move to Pending</button>
                            <button onClick={handleReAssign}>Re-assign</button>
                            <button value={`/owner/resolve-order-query/customerdetails/${orderin.customer_id}`} onClick={handleCustomerDetail}>Show Customer Details</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
