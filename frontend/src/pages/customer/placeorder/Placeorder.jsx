import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authenticateUser } from '../../../actions/general/authenticateUser';
import { placeOrder } from '../../../actions/orders/placeOrder';

export default function Placeorder({ cookies }) {
    const navigate = useNavigate();

    useEffect(() => {
        const { token } = cookies;
        const authenticate = async () => {
            const response = authenticateUser('customer', token);
            if ('error' === response.type) {
                alert('you are not authenticated' + response.error);
                navigate('/login');
            }
        }
        authenticate();
    }, [cookies]);

    const { company_name } = useParams();

    const [orderData, setOrderData] = useState({
        water_type: '', water_temperature: '', water_quantity: '', companyname: company_name
    });

    const handleInputData = (e) => {
        const { name, value } = e.target;

        // put constraints for other fields as well
        if ('water_quantity' === name) {
            const ch = (value.slice(-1));

            if (!(ch <= '9' && ch >= '0'))
                return;
        }
        setOrderData(prevState => ({ ...prevState, [name]: value }));
    }

    const [addressData, setAddressData] = useState({
        line1: '', line2: '', city: '', pincode: '', state: ''
    });

    const handleInputAddress = (e) => {
        const { name, value } = e.target;
        setAddressData(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const order = { ...orderData, address:{...addressData} };
        const { token } = cookies;
        const fetchData = async () => {
            const response = await placeOrder(token,order);
            if( 'error'===response.type ){
                alert(response.error);
            }else{
                navigate('/show-companies');
            }
        }
        fetchData();
    }

    return (
        <div>
            <form action="post">
                <label htmlFor="water_type">Choose a water type:</label>

                <select name="water_type" onChange={handleInputData} value={orderData.water_type}>
                    <option value="">water type</option>
                    <option value="filtered_water">filtered water</option>
                    <option value="natural_water">Natural water</option>
                    <option value="alkline_water">alkline water</option>
                    <option value="normal_water">normal water</option>
                </select>

                <label htmlFor="water_temperature">Choose a water temperature:</label>

                <select name="water_temperature" onChange={handleInputData} value={orderData.water_temperature}>
                    <option value="">water temperature</option>
                    <option value="hot_water">hot</option>
                    <option value="cold_water">cold</option>
                    <option value="normal_water">normal</option>
                </select>
                water quantity :
                <input type="text" name="water_quantity" value={orderData.water_quantity} onChange={handleInputData} />

                {/* address */}
                Line1 : <input type="text" name="line1" onChange={handleInputAddress} value={addressData.line1} />
                Line2 : <input type="text" name="line2" onChange={handleInputAddress} value={addressData.line2} />
                city : <input type="text" name="city" onChange={handleInputAddress} value={addressData.city} />
                pincode : <input type="text" name="pincode" onChange={handleInputAddress} value={addressData.pincode} />
                state : <input type="text" name="state" onChange={handleInputAddress} value={addressData.state} />

                companyname : <input type="text" name="companyname" value={orderData.companyname} readOnly={true} />

                <button type="submit" onClick={handleSubmit}>submit</button>
            </form>
        </div>
    )
}
