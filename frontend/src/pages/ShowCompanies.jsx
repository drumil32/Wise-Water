import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../components/Spinner';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

//  not 100% sure how this code works
// REASON :- useEffect with useRef

export default function ShowCompanies() {
    
    const navigate = useNavigate();
    const [companies, setCompanies] = useState(null);
    const [searchedCompanies, setSearchedCompanies] = useState(null);
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

    if ( null===companies )
        return (<Spinner />);

    const handleApply = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`/worker/application/${e.target.value}`);
    }

    const redirectHandler = (e)=>{
        e.preventDefault();
        console.log(e.target);
        navigate(`${e.target.value}`);
    }

    return (
        <div>
            {searchedCompanies.length!==0 && 
            <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} />}
            {
                searchedCompanies.length!==0 && 
                searchedCompanies.map((company, index) => {
                    // change is reuqired from UI
                    return (
                        <p key={index} >
                            {company.name}
                            <button value={company.name} onClick={handleApply}>apply</button>
                        </p>
                    )
                })
            }
            {searchedCompanies.length===0 && <p>no companies found</p>}
            <div>
                <button onClick={redirectHandler} value="login">login</button>
                <button onClick={redirectHandler} value="/customer/register">sign up as customer</button>
                <button onClick={redirectHandler} value={"/owner/register"}>sign up as Owner</button>
            </div>
        </div>
    )
}
