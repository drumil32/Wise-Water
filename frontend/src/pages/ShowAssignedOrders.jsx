import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ShowOrder from "../components/ShowOrder";

export default function ShowAssignedOrders({ cookies }) {
    const navigate = useNavigate();
    const [assignedOrders, setAssignedOrders] = useState(null);
    useEffect(() => {
        const { token } = cookies;
        const authenticate = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/owner/authenticate', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                const data = await response.json();
                console.log(data)
                if (data.type === 'error') throw new Error(data.message);
            } catch (error) {
                alert('you are not authenticated' + error);
                navigate('/login');
            }
        }
        authenticate();

        const fun = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/owner/show-assigned-orders', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                const data = await response.json();
                console.log(data)
                if (data.type === 'error') throw new Error(data.message);
                setAssignedOrders(data.assignedOrders);
            } catch (error) {
                alert('you are not authenticated' + error);
                navigate('/login');
            }
        }
        fun();
    }, []);

    if (null === assignedOrders) {
        return <Spinner />;
    }

    return (
        <div>
            {0 === assignedOrders.length && <p>no order are assigned</p>}
            {
                assignedOrders.map((assignedOrder, index) => {
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
