import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../components/Spinner';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

//  not 100% sure how this code works
// REASON :- useEffect with useRef

export default function ShowCompanies() {
    console.log(Fuse)
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const [searchedCompanies, setSearchedCompanies] = useState([]);
    const fuse = useRef(null);
    useEffect(() => {
        const fun = async () => {
            const response = await fetch(`http://localhost:3001/api/user/showCompanies`);
            const data = await response.json();

            fuse.current = new Fuse(data.companies, {
                keys: [
                    'name',
                    'address',
                ],
                includeScore: true
            });
            // console.log(fuse);   
            setCompanies(data.companies);
            setSearchedCompanies(data.companies);
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
                setSearchedCompanies(temp);
            } else
                setSearchedCompanies(companies);
        } else {
            console.log("here")
        }
    }, [fuse, query]);

    if (0 === companies.length)
        return (<Spinner />);

    const handleApply = (e) => {
        e.preventDefault();
        navigate(`/worker/application/:compnayname:${e.target.value}`);
    }

    return (
        <div>
            <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} />
            {
                searchedCompanies.map((compnay, index) => {
                    // change is reuqired from UI
                    return (
                        <p key={index} >
                            {compnay.name}
                            <button value={compnay.name} onClick={handleApply}>apply</button>
                        </p>
                    )
                })
            }
        </div>
    )
}
