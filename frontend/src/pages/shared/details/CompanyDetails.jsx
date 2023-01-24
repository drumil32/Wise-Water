import React from 'react';
import AddressDetails from './AddressDetails'

function CompanyDetails({companyData}) {
    return (
        <div>
            <p>your company name : {companyData.name}</p>
            <p>your company email : {companyData.email}</p>
            <p>your company contact : {companyData.contact}</p>
            <p>your company service time : {companyData.serviceTime}</p>
            <p>your company rating : {companyData.rating}</p>
            <p>your company name : {companyData.name}</p>
            <AddressDetails address={companyData.address}/>
        </div>
    )
}

export default CompanyDetails;