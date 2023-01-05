import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../components/Spinner';
import Fuse from 'fuse.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
    const [workerApplications, setWorkerApplications] = useState(null);
    const [searchedWorkerApplications, setSearchedWorkerApplications] = useState(null);
    const { token } = cookies;
    const fuse = useRef(null);
    useEffect(() => {
        const fun = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/owner/showWorkerApplications`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ token }),
                });
                const data = await response.json();
                if (data.type === 'error') throw (data.message);
                console.log(data);
                fuse.current = new Fuse(data.workerApplications, {
                    keys: [
                        'name',
                        'email',
                    ],
                    includeScore: true
                });
                // console.log(fuse);
                console.log(data);
                console.log(data.workerApplications);
                setWorkerApplications(data.workerApplications);
                setSearchedWorkerApplications(data.workerApplications);
            } catch (error) {
                navigate('/');
            }
        }
        fun();
    }, []);

    const [query, setQuery] = useState('');

    useEffect(() => {
        if (fuse.current) {
            if ('' !== query) {
                console.log(query)
                const results = fuse.current.search(query);
                const temp = [];
                results.forEach(result => {
                    temp.push(result.item);
                });
                console.log(temp);
                setSearchedWorkerApplications(temp);
            } else {
                setSearchedWorkerApplications(workerApplications)
            }
        } else {
            console.log("here")
        }
    }, [fuse, query]);

    if (null === searchedWorkerApplications)
        return (<Spinner />);

    const handleHiring = async (e) => {
        e.preventDefault();

        const workerApplication = searchedWorkerApplications.filter(workerApplication => workerApplication.email === e.target.value);
        const obj = {...workerApplication[0]};
        console.log(obj);
        try {
            
            const response = await fetch(`http://localhost:3001/api/owner/hire-worker`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token, workerApplication: obj}),
            });
            const data = await response.json();
            if (data.type === 'error') throw (data.message);
            console.log(data);
            const temp = searchedWorkerApplications.filter(workerApplication => workerApplication.email !== e.target.value);
            setWorkerApplications(temp);
            setSearchedWorkerApplications(temp);
        }catch(error){
            toast(error);
        }
    }

    return (
        <div>{searchedWorkerApplications.length !== 0 ?
            <>
                <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} />
                {
                    searchedWorkerApplications.map((workerApplication, index) => {
                        return (
                            <div key={index}>
                                <h2>application {index}</h2>
                                <p>first Name :- {workerApplication.firstname}</p>
                                <p>last Name :- {workerApplication.lastname}</p>
                                <p>contact :- {workerApplication.contact}</p>
                                <p>email :- {workerApplication.email}</p>
                                <button onClick={handleHiring} value={workerApplication.email}>hire worker</button>
                            </div>
                        )
                    })
                }
            </>
            : <>No application found</>}
        </div>
    )
}

export default ShowWorkerApplications