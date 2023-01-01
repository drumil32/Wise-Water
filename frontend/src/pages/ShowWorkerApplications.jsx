import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../components/Spinner';
import Fuse from 'fuse.js';

//  not 100% sure how this code works
// REASON :- useEffect with useRef

// REMAING :- for now i am fatching all the worker details but 

// some how we need to pass compnay id to backend in fetch function with post method
// then backend will find all the users who applied for this compnay and then only those worker will be shown to owner but for now authentication is remaing so i didn't did that
// AND ACCRODINGY WE ALSO NEED TO CHANGE BACKEND AS WELL

function ShowWorkerApplications() {
    console.log(Fuse)
    const [workerApplications, setWorkerApplications] = useState([]);
    const fuse = useRef(null);
    useEffect(() => {
        const fun = async () => {
            const response = await fetch(`http://localhost:3001/api/owner/showWorkerApplications`);
            const data = await response.json();
            console.log(data);
            fuse.current = new Fuse(data.workerApplications, {
                keys: [
                    'name',
                    'address',
                ],
                includeScore: true
            });
            // console.log(fuse);
            setWorkerApplications(data.workerApplications);
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
        }else{
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