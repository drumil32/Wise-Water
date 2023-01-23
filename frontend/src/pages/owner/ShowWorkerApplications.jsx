import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../../components/Spinner';
import Fuse from 'fuse.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { giveWorkerApplications } from '../../actions/owner/giveWorkerApplications';
import { hireWorker } from '../../actions/owner/hireWorker';

//  not 100% sure how this code works
// REASON :- useEffect with useRef

// REMAING :- for now i am fatching all the worker details but 

// some how we need to pass company id to backend in fetch function with post method
// then backend will find all the users who applied for this company and then only those worker will be shown to owner but for now authentication is remaing so i didn't did that
// AND ACCRODINGY WE ALSO NEED TO CHANGE BACKEND AS WELL

function ShowWorkerApplications({ cookies }) {

    const navigate = useNavigate();
    const [searchedWorkerApplications, setSearchedWorkerApplications] = useState(null);
    const [query, setQuery] = useState('');
    const workerApplications = useRef(null);
    const fuse = useRef(null);
    const { token } = cookies;

    useEffect(() => {

        const fetchData = async () => {
            const { token } = cookies;
            const response = await giveWorkerApplications(token);
            if ('error' === response.type) {
                alert(response.error);
                navigate('/login');
            } else {
                console.log(response)
                workerApplications.current = [...response.workerApplications];
                fuse.current = new Fuse(workerApplications.current, {
                    keys: [
                        'firstname',
                        'lastname',
                    ],
                    includeScore: true
                });
                setSearchedWorkerApplications(workerApplications.current);
            }
        }
        fetchData();
    }, []);


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
                setSearchedWorkerApplications(workerApplications.current)
            }
        }
    }, [fuse, query]);

    if (null === searchedWorkerApplications)
        return (<Spinner />);

    const handleHiring = async (e) => {
        e.preventDefault();

        const workerApplication = { ...searchedWorkerApplications[e.target.value] };
        console.log(workerApplication);
        const response = await hireWorker(token, workerApplication);
        if ('error' === response.type) {
            alert(response.error);
        } else {
            const response = await giveWorkerApplications(token);
            workerApplications.current = [response.workerApplications];
            setSearchedWorkerApplications(response.workerApplications);
            setQuery('');
        }
    }

    return (
        <div>
        {
            searchedWorkerApplications.length !== 0 ?
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
                                    <button onClick={handleHiring} value={index}>hire worker</button>
                                </div>
                            )
                        })
                    }
                </>
                : <>No application found</>
        }
        </div>
    )
}

export default ShowWorkerApplications