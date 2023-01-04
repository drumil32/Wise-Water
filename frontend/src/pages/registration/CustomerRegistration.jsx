import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// firstname, email, password, confirmPassword , lastname, address, contact

export default function CustomerRegistration({ setCookies }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: '', lastname: '', email: '', password: '', confirmPassword: '', contact: ''
    });
    const [formAddress, setFormAddress] = useState({
        line1: '', line2: '', city: '', pincode: '', state: ''
    });

    const handleInputAddress = (e) => {
        const { name, value } = e.target;
        setFormAddress(prevState => ({ ...prevState, [name]: value }));
    }

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const { firstname, lastname, email, password, confirmPassword, contact } = formData;
    const address = { ...formAddress };


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
            console.log(data);
            if (data.type === 'error') throw new Error(data.message);
            setCookies('token', data.token);
            navigate('/customer/profile');
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
                contact : <input type="text" name="contact" onChange={handleInputData} value={contact} />

                {/* address : <input type="text" name="address" onChange={handleInputData} value={address} /> */}

                {/* address */}
                Line1 : <input type="text" name="line1" onChange={handleInputAddress} value={formAddress.line1} />
                Line2 : <input type="text" name="line2" onChange={handleInputAddress} value={formAddress.line2} />
                city : <input type="text" name="city" onChange={handleInputAddress} value={formAddress.city} />
                pincode : <input type="text" name="pincode" onChange={handleInputAddress} value={formAddress.pincode} />
                state : <input type="text" name="state" onChange={handleInputAddress} value={formAddress.state} />


                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
