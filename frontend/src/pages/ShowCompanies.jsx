import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../components/Spinner';
import Fuse from 'fuse.js';
import { useNavigate } from 'react-router-dom';

//  not 100% sure how this code works
// REASON :- useEffect with useRef

export default function ShowCompanies({ cookies }) {

    const navigate = useNavigate();
    const [companies, setCompanies] = useState(null);
    const [userType, setUserType] = useState(null);
    const [searchedCompanies, setSearchedCompanies] = useState(null);
    const fuse = useRef(null);
    useEffect(() => {
        const { token } = cookies;
        const fun = async () => {
            const response = await fetch(`http://localhost:3001/api/user/showCompanies`);
            const userTypeResponse = await fetch(`http://localhost:3001/api/user/userType`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token }),
            });
            const data = await response.json();
            const typeOfUser = await userTypeResponse.json();
            console.log(typeOfUser);
            setUserType(typeOfUser.userType);
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

    if (null === companies)
        return (<Spinner />);

    const handleApply = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`/worker/application/${e.target.value}`);
    }

    const handlePlaceorder = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`/customer/placeorder/${e.target.value}`);
    }

    const redirectHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
        navigate(`${e.target.value}`);
    }

    return (
        <div>
            <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} />
            {
                searchedCompanies.length !== 0 &&
                searchedCompanies.map((company, index) => {
                    // change is reuqired from UI
                    return (
                        <p key={index} >
                            {company.name}
                            {'guest' === userType && <button value={company.name} onClick={handleApply}>apply</button>}
                            {'customer' === userType && <button value={company.name} onClick={handlePlaceorder}>place order</button>}
                        </p>
                    )
                })
            }
            {searchedCompanies.length === 0 && <p>no companies found</p>}
        </div>
    )
}
