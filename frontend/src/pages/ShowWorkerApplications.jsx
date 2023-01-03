import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../components/Spinner';
import Fuse from 'fuse.js';
import { toast } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';

//  not 100% sure how this code works
// REASON :- useEffect with useRef

// REMAING :- for now i am fatching all the worker details but 

// some how we need to pass company id to backend in fetch function with post method
// then backend will find all the users who applied for this company and then only those worker will be shown to owner but for now authentication is remaing so i didn't did that
// AND ACCRODINGY WE ALSO NEED TO CHANGE BACKEND AS WELL

function ShowWorkerApplications({ cookies }) {
    const navigate = useNavigate();
    // console.log(cookies);
    // console.log(Fuse)
    const [workerApplications, setWorkerApplications] = useState([]);
    const fuse = useRef(null);
    useEffect(() => {
        const fun = async () => {
            try{
                const {token} = cookies;
                const response = await fetch(`http://localhost:3001/api/owner/showWorkerApplications`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token }),
                });
                const data = await response.json();
                if( data.type==='error' )   throw(data.message);
                console.log(data);
                fuse.current = new Fuse(data.workerApplications, {
                    keys: [
                        'name',
                        'email',
                    ],
                    includeScore: true
                });
                // console.log(fuse);
                setWorkerApplications(data.workerApplications);
            }catch(error){
                navigate('/');
            }
        }
        fun();
    }, []);

    const [query, setQuery] = useState('');

    useEffect(() => {
        if (fuse.current) {
            console.log(query)
            const results = fuse.current.search(query);
            const temp = [];
            results.forEach(result => {
                temp.push(result.item);
            });
            console.log(temp);
            setWorkerApplications(temp);
        } else {
            console.log("here")
        }
    }, [fuse, query]);

    if (0 === workerApplications.length)
        return (<Spinner />);

    return (
        <div>
            <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} />
            {
                workerApplications.map((workerApplication, index) => {
                    return <p key={index}>{workerApplication.firstname}</p>
                })
            }
        </div>
    )
}

export default ShowWorkerApplications