import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Placeorder({ cookies }) {
    const navigate = useNavigate();
    const { company_name } = useParams();
    console.log(company_name);

    const [formData, setFormData] = useState({
        water_type: '', water_temperature: '', water_quantity: '', companyname: company_name
    });

    const handleInputData = (e) => {
        const { name, value } = e.target;
        if ('water_quantity' === name) {
            console.log(value);
            const ch = (value.slice(-1));

            if (!(ch <= '9' && ch >= '0'))
                return;
        }
        setFormData(prevState => ({ ...prevState, [name]: value }));
    }

    const [formAddress,setFormAddress] = useState({
        line1 : '',line2 : '',city:'',pincode:'',state:''
    });

    const handleInputAddress = (e)=>{
        const {name,value} = e.target;
        setFormAddress(prevState=>({...prevState,[name]:value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const address = {...formAddress}
        const order = { ...formData,address };

        const { token } = cookies;
        console.log(order);
        try {
            const response = await fetch(`http://localhost:3001/api/customer/placeorder`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, order })
            });
            console.log(response);
            const data = await response.json();
            console.log(data)
            if (data.type === 'error') throw new Error(data.message);
            navigate('/');
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            <form action="post">
                <label htmlFor="water_type">Choose a water type:</label>

                <select name="water_type" onChange={handleInputData} value={formData.water_type}>
                    <option value="">water type</option>
                    <option value="filtered_water">filtered water</option>
                    <option value="natural_water">Natural water</option>
                    <option value="alkline_water">alkline water</option>
                    <option value="normal_water">normal water</option>
                </select>

                <label htmlFor="water_temperature">Choose a water temperature:</label>

                <select name="water_temperature" onChange={handleInputData} value={formData.water_temperature}>
                    <option value="">water temperature</option>
                    <option value="hot_water">hot</option>
                    <option value="cold_water">cold</option>
                    <option value="normal_water">normal</option>
                </select>
                water quantity :
                <input type="text" name="water_quantity" value={formData.water_quantity} onChange={handleInputData} />

                {/* address */}
                Line1 : <input type="text" name="line1" onChange={handleInputAddress} value={formAddress.line1} />
                Line2 : <input type="text" name="line2" onChange={handleInputAddress} value={formAddress.line2} />
                city : <input type="text" name="city" onChange={handleInputAddress} value={formAddress.city} />
                pincode : <input type="text" name="pincode" onChange={handleInputAddress} value={formAddress.pincode} />
                state : <input type="text" name="state" onChange={handleInputAddress} value={formAddress.state} />

                companyname : <input type="text" name="companyname" value={formData.companyname} readOnly={true} />

                <button type="submit" onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}
