import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

// const { firstname, email, lastname, contact, company_id}

export default function WorkerApplication() {
  const navigate = useNavigate();
  const {company_params_name} = useParams();
  // console.log(params);
  // console.log(params.)
  const [formData, setFormData] = useState({
    firstname: '', lastname: '', email: '', contact: '', companyname: company_params_name
  });

  const handleInputData = (e) => {
    // console.log(e.target)
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const { firstname, lastname, email, contact, companyname } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const worker = { firstname, lastname, email, contact, companyname };

    try {
      const response = await fetch(`http://localhost:3001/api/worker/application`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(worker)
      });
      console.log(response);
      const data = await response.json();
      if (data.type === 'error') throw new Error(data.message);
      navigate('/show-companies');
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
        contact : <input type="text" name="contact" onChange={handleInputData} value={contact} />
        companyname : <input type="text" name="companyname" value={companyname} readOnly={true}/>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}
