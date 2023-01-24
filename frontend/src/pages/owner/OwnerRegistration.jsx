import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { registerUser } from '../../actions/shared/registerUser';
import CompanyDetailsForm from '../shared/form/CompanyDetailsForm';
import UserDetailsForm from '../shared/form/UserDetailsForm';

export default function OwnerRegistration({ setCookies }) {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        firstname: '', lastname: '', email: '', password: '', confirmPassword: '', contact: ''
    });

    const [companyData, setCompanyData] = useState({
        name: '', email: '', contact: '', serviceTime: '',
        address: { line1: '', line2: '', city: '', pincode: '', state: '' }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const owner = { userData: { ...userData }, companyData: { ...companyData } };

        console.log(owner);

        const response = await registerUser('owner', owner);
        if ('error' === response.type) {
            alert(response.error);
        } else {
            setCookies('token', response.token);
            alert('you are registered successfully');
            navigate('/owner/profile');
        }

    }
    return (
        <div>
            <form method="post" >
                <UserDetailsForm userData={userData} setUserData={setUserData} />

                {/* company */}
                <CompanyDetailsForm companyData={companyData} setCompanyData={setCompanyData} />

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
