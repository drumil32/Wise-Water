import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Spinner';
import { giveUserData } from '../../../actions/shared/profile/giveUserData';

import CompanyDetails from '../details/CompanyDetails';
// import CompanyDetails from ''
import AddressDetails from '../details/AddressDetails';
import UserDetails from '../details/UserDetails';
import ProfileButtons from './ProfileButtons';

export default function Profile({ cookies, removeCookies, userType }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            const response = await giveUserData(userType, token);
            if ('error' === response.type) {
                alert(response.error);
                navigate('/');
            } else {
                setUserData(response.userData);
                if( 'customer'!==userType )
                    setCompanyData(response.companyData);
            }
        }
        fetchData();
    }, [cookies]);

    const handleLogout = (e) => {
        e.preventDefault();
        console.log(removeCookies)
        removeCookies('token');
        navigate('/');
    }

    if (userData === null || ('customer' !== userType && null === companyData)) {
        return <Spinner />
    }

    const redirectHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`${e.target.value}`);
    }

    return (
        <>
            <UserDetails userData={userData} />
            {
                'customer' !== userType ?
                    <CompanyDetails companyData={companyData} /> :
                    <AddressDetails address={userData.address}/>
            }
            <ProfileButtons userType={userType} redirectHandler={redirectHandler} />
            <button onClick={handleLogout}>logout</button>
        </>
    );
}
