import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner'

function ShowCompnaies() {
    const [compnaies, setCompnaies] = useState([]);
    useEffect(() => {
        const fun = async () => {
            const response = await fetch(`http://localhost:3001/api/user/showCompnaies`);
            const data = await response.json();
            console.log(data.companies)
            setCompnaies(data.companies);
            console.log(data);
        }
        fun();
    }, []);

    if (0 === compnaies.length)
        return (<Spinner />);

    return (
        <div>
            {
                compnaies.map((compnay,index)=>{
                    return <p key={index}>{compnay.name}</p>
                })
            }
        </div>
    )
}

export default ShowCompnaies