import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../actions/shared/registerUser';
import UserDetailsForm from '../shared/form/UserDetailsForm';
import AddressDetailsForm from '../shared/form/AddressDetailsForm';

function CustomerRegistration({ setCookies }) {
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        firstname: '', lastname: '', email: '', password: '', confirmPassword: '', contact: '',
        address: { line1: '', line2: '', city: '', pincode: '', state: '' }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const customer = { ...userData, address : {...userData.address} };
        const response = await registerUser('customer',customer);
        if( 'error'===response.type ){
            alert(response.error);
        }else{
            setCookies('token', response.token);
            alert('you are registered successfully');
            navigate('/customer/profile');
        }
    }

    const setAddress = (address)=>{
        setUserData(prevState=>({...prevState,address:{...address}}));
    }

    return (
        <div>
            <form method="post" >
                <UserDetailsForm userData={userData} setUserData={setUserData} />
                <AddressDetailsForm address={userData.address} setAddress={setAddress}/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CustomerRegistration