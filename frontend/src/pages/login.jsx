import React, { useState } from 'react';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const hadleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const user = {
      collectionName: e.target.value,
      email: userName,
      password: password,
    };

    //  I CHANGED PROMISES TO ASYNC AWAIT
    try {
      const response = await fetch(`http://localhost:5000/api/user/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // .then(async function (res) {
    //   return await res.json();
    // })
    // .then((val) => {
    //   console.log(val);
    // })
    // .catch((err) => console.error(err));
  }
  return (
    <>
      <form>
        UserName: <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
        password: <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <button type="submit" value="Customer" onClick={hadleSubmit}>Login as customer</button>
        <button type="submit" value="Worker" onClick={hadleSubmit}>Login as Worker</button>
        <button type="submit" value="Owner" onClick={hadleSubmit}>Login as Owner</button>
      </form>
    </>
  );
}