import React from 'react'

function AddressDetailsForm({ address, setAddress }) {

    const handleInput = (e) => {
        const { value, name } = e.target;
        setAddress({ ...address, [name]: value });
    }

    return (
        <div>
            Line1 : <input type="text" name="line1" onChange={handleInput} value={address.line1} />
            Line2 : <input type="text" name="line2" onChange={handleInput} value={address.line2} />
            city : <input type="text" name="city" onChange={handleInput} value={address.city} />
            pincode : <input type="text" name="pincode" onChange={handleInput} value={address.pincode} />
            state : <input type="text" name="state" onChange={handleInput} value={address.state} />
        </div>
    );
}

export default AddressDetailsForm