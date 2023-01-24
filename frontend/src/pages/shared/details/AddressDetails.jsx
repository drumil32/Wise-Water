import React from 'react';

function AddressDetails({address}) {
    return (
        <div>
            <h3>address</h3>
            <p>line1 : {address.line1}</p>
            <p>line1 : {address.line2}</p>
            <p>line1 : {address.pincode}</p>
            <p>line1 : {address.state}</p>
        </div>
    )
}

export default AddressDetails