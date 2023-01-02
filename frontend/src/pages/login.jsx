import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Login({setCookies}) {
  // console.log(setCookies);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const hadleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const user = {
      collectionName: e.target.value,
      email: email,
      password: password,
    };
    console.log(user);
    //  I CHANGED PROMISES TO ASYNC AWAIT
    try {
      //  how to use backend env file to frontend ??
      const response = await fetch(`http://localhost:3001/api/user/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      if( data.type ) throw new Error(data.message);
      
      setCookies('token', data.token);

      navigate('/owner/profile');

    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <form>
        email: <input type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        password: <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button type="submit" value="Customer" onClick={hadleSubmit}>Login as customer</button>
        <button type="submit" value="Worker" onClick={hadleSubmit}>Login as Worker</button>
        <button type="submit" value="Owner" onClick={hadleSubmit}>Login as Owner</button>
      </form>
    </>
  );
}