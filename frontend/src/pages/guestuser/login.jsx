import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../actions/general/loginUser';

export default function Login({ setCookies }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hadleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      collectionName: e.target.value,
      email: email,
      password: password,
    };
    const response = await loginUser(user);
    console.log(response)
    if ('error' === response.type) {
      alert(response.error);
    } else {
      setCookies('token', response.token);
      console.log(response.token)
      alert('successfully logged in');
      navigate(`/${user.collectionName.toLowerCase()}/profile`);
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