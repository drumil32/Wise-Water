import React, { useState } from 'react';
import { toast } from 'react-toastify';

// { firstname, lastname, email, password, confirmPassword , contact, cName, cEmail,cContact,cAddress, cServiceTime }

export default function OwnerRegistration() {

    const [formData, setFormData] = useState({
        firstname: '', lastname: '', email: '', password: '', confirmPassword: '',  contact: '',cName : '', cEmail : '',cContact : '',cAddress : '', cServiceTime : ''
    });

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const { firstname, lastname, email, password, confirmPassword, contact, cName, cEmail,cContact,cAddress, cServiceTime } = formData;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const owner = { firstname, lastname, email, password, confirmPassword, contact, cName, cEmail,cContact,cAddress, cServiceTime };
        console.log(owner)
        try {
            const response = await fetch(`http://localhost:3001/api/owner/register`, {

                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(owner)
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
                contact : <input type="text" name="contact" onChange={handleInputData} value={contact} />
                compnay name : <input type="name" name="cName" onChange={handleInputData} value={cName} />
                compnay email : <input type="email" name="cEmail" onChange={handleInputData} value={cEmail} />
                compnay contact : <input type="email" name="cContact" onChange={handleInputData} value={cContact} />
                compnay address : <input type="text" name="cAddress" onChange={handleInputData} value={cAddress} />
                compnay service time : <input type="text" name="cServiceTime" onChange={handleInputData} value={cServiceTime} />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
