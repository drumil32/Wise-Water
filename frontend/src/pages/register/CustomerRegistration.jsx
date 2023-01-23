import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../actions/general/registerUser';
import UserDetailsForRegister from './UserDetailsForRegister';
import AddressDetailsForRegister from './AddressDetailsForRegister';

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
                <UserDetailsForRegister userData={userData} setUserData={setUserData} />
                <AddressDetailsForRegister address={userData.address} setAddress={setAddress}/>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CustomerRegistration