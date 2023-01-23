import React from 'react'

function UserDetailsForRegister({ userData, setUserData }) {
    const { firstname, lastname, email, contact, password, confirmPassword } = userData;

    const handleInputData = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    }

    return (
        <div>

            firstName : <input type="text" name="firstname" onChange={handleInputData} value={firstname} />
            lastName : <input type="text" name="lastname" onChange={handleInputData} value={lastname} />
            email : <input type="email" name="email" onChange={handleInputData} value={email} />
            contact : <input type="text" name="contact" onChange={handleInputData} value={contact} />

            password : <input type="password" name="password" onChange={handleInputData} value={password} />
            confirm password : <input type="password" name="confirmPassword" onChange={handleInputData} value={confirmPassword} />

        </div>
    )
}

export default UserDetailsForRegister