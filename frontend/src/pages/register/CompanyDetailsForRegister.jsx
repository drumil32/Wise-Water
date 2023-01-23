import React from 'react';
import AddressDetailsForRegister from './AddressDetailsForRegister';

function CompanyDetailsForRegister({ companyData, setCompanyData }) {
    const { name, email, contact, serviceTime } = companyData;

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setCompanyData(prevState => ({ ...prevState, [name]: value }));
    }

    const setAddress = (address) => {
        setCompanyData(prevState => ({ ...prevState, address: { ...address } }));
    }

    return (
        <div>

            company name : <input type="name" name="name" onChange={handleInputData} value={name} />
            company email : <input type="email" name="email" onChange={handleInputData} value={email} />
            company contact : <input type="email" name="contact" onChange={handleInputData} value={contact} />
            company service time : <input type="text" name="serviceTime" onChange={handleInputData} value={serviceTime} />

            <AddressDetailsForRegister address={companyData.address} setAddress={setAddress} />
        </div>
    )
}

export default CompanyDetailsForRegister