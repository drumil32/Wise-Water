import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { registerUser } from '../../actions/shared/registerUser';

export default function WorkerApplicationFrom() {
  const navigate = useNavigate();
  const { companyname } = useParams();

  const [userData, setuserData] = useState({
    firstname: '', lastname: '', email: '', contact: '', companyname
  });

  const handleInputData = (e) => {
    const { name, value } = e.target;
    setuserData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const worker = { ...userData };

    const response = await registerUser('worker', worker);
    if ('error' === response.type) {
      alert(response.error);
    } else {
      alert('successfully applied');
      navigate('/show-companies');
    }
  }

  return (
    <div>
      <form method="post" >
        firstName : <input type="text" name="firstname" onChange={handleInputData} value={userData.firstname} />
        lastName : <input type="text" name="lastname" onChange={handleInputData} value={userData.lastname} />
        email : <input type="email" name="email" onChange={handleInputData} value={userData.email} />
        contact : <input type="text" name="contact" onChange={handleInputData} value={userData.contact} />
        companyname : <input type="text" name="companyname" value={userData.companyname} readOnly={true} />
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}