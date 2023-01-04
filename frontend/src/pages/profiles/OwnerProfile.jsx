import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner'
import e from 'cors';

export default function OwnerProfile({ cookies,removeCookies }) {
    console.log(removeCookies)
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

    const handleLogout = (e) => {
        e.preventDefault();
        console.log(removeCookies)
        removeCookies('token');
        navigate('/');
    }

    if (userData === null || null === companyData) {
        return <Spinner />
    }

    const onWorkerApplication = (e) => {
        e.preventDefault();
        navigate('/owner/show-worker-applications');
    }

    const redirectHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`${e.target.value}`);
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
                <p>your company name : {companyData.name}</p>
                <p>your company email : {companyData.email}</p>
                <p>your company contact : {companyData.contact}</p>
                <p>your company service time : {companyData.serviceTime}</p>
                <p>your company rating : {companyData.rating}</p>
                <h3>address</h3>
                <p>line1 : {companyData.address.line1}</p>
                <p>line1 : {companyData.address.line2}</p>
                <p>line1 : {companyData.address.pincode}</p>
                <p>line1 : {companyData.address.state}</p>
            </div>
            <button onClick={redirectHandler} value="/">Show companies</button>
            <button onClick={handleLogout}>logout</button>
        </>
    );
}
