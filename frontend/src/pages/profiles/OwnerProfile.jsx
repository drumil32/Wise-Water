import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner'

export default function OwnerProfile({ cookies }) {
    const navigate = useNavigate();
    console.log('owner profile');
    const [userData, setUserData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    useEffect(() => {
        const fun = async () => {
            try {
                const { token } = cookies;
                const response = await fetch(`http://localhost:3001/api/owner/profile`, {
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
                setCompanyData(data.company);
            } catch (error) {
                navigate('/');
            }
        }
        fun();
    }, []);

    if (userData === null || null === companyData) {
        return <Spinner />
    }

    const onWorkerApplication = (e) => {
        e.preventDefault();
        navigate('/owner/show-worker-applications');
    }

    return (
        <>
            <div>
                <button onClick={onWorkerApplication}>show worker application</button>
            </div>
            <div>
                <p>your first name : {userData.firstname}</p>
                <p>your last name : {userData.lastname}</p>
                <p>your email address : {userData.email}</p>
                <p>your Contact number : {userData.contact}</p>
                <p>your compnay name : {companyData.name}</p>
                <p>your compnay email : {companyData.email}</p>
                <p>your compnay contact : {companyData.contact}</p>
                <p>your compnay service time : {companyData.serviceTime}</p>
                <p>your compnay rating : {companyData.rating}</p>
            </div>
        </>
    );
}
