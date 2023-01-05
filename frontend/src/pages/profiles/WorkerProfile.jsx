import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';

export default function WorkerProfile({ cookies, removeCookies }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    // const [companyData, setCompanyData] = useState(null);
    useEffect(() => {
        const fun = async () => {
            try {
                const { token } = cookies;
                const response = await fetch(`http://localhost:3001/api/worker/profile`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token }),
                });
                const data = await response.json();
                if (data.type === 'error') throw (data.message);
                console.log(data);
                setUserData(data.user);
            } catch (error) {
                navigate('/');
            }
        }
        fun();
    }, []);

    if (userData === null) {
        return <Spinner />
    }

    const handleLogout = (e) => {
        e.preventDefault();
        console.log(removeCookies)
        removeCookies('token');
        navigate('/');
    }

    return (
        <div>
            <p>your first name : {userData.firstname}</p>
            <p>your last name : {userData.lastname}</p>
            <p>your email address : {userData.email}</p>
            <p>your Contact number : {userData.contact}</p>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}
