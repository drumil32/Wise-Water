import React, { useState } from 'react';
import { toast } from 'react-toastify';

// firstname, email, password, confirmPassword , lastname, address, contact

export default function CustomerRegistration() {

    const [formData, setFormData] = useState({
        firstname: '', lastname: '', email: '', password: '', confirmPassword: '', address: '', contact: ''
    });

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const { firstname, lastname, email, password, confirmPassword, address, contact } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customer = { firstname, lastname, email, password, confirmPassword, address, contact };

        try {
            const response = await fetch(`http://localhost:3001/api/customer/register`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customer)
            });
            console.log(response);
            const data = await response.json();
            if( data.type==='error' )   throw new Error(data.message);
            console.log(data);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div>
            <form method="post" >
                firstName : <input type="text" name="firstname" onChange={handleInputData} value={firstname} />
                lastName : <input type="text" name="lastname" onChange={handleInputData} value={lastname} />
                email : <input type="email" name="email" onChange={handleInputData} value={email} />
                password : <input type="password" name="password" onChange={handleInputData} value={password} />
                confirm password : <input type="password" name="confirmPassword" onChange={handleInputData} value={confirmPassword} />
                address : <input type="text" name="address" onChange={handleInputData} value={address} />
                contact : <input type="text" name="contact" onChange={handleInputData} value={contact} />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
