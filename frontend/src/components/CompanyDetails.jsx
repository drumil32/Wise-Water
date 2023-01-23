import React from 'react';
import Address from './Address'

function CompanyDetails({companyData}) {
    return (
        <div>
            <p>your company name : {companyData.name}</p>
            <p>your company email : {companyData.email}</p>
            <p>your company contact : {companyData.contact}</p>
            <p>your company service time : {companyData.serviceTime}</p>
            <p>your company rating : {companyData.rating}</p>
            <p>your company name : {companyData.name}</p>
            <Address address={companyData.address}/>
        </div>
    )
}

export default CompanyDetails;