import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../components/Spinner';
import Fuse from 'fuse.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { giveCompaniesData } from '../actions/general/giveCompaniesData';
import { giveUserType } from '../actions/general/giveUserType';

//  not 100% sure how this code works
// REASON :- useEffect with useRef

// now it seems like i am able to understand how useRef is works
// and changed comapnies object from useState hook to useRef hook
// REASON :- optimization

export default function ShowCompanies({ cookies }) {

    const navigate = useNavigate();
    const companies = useRef(null);
    const [userType, setUserType] = useState(null);
    const [searchedCompanies, setSearchedCompanies] = useState(null);
    const fuse = useRef(null);

    useEffect(() => {
        const { token } = cookies;
        const fetchData = async () => {
            var response = await giveCompaniesData();

            if ('error'===response.type) {
                alert(response.error);
                return;
            }
            const companiesData = [...response.companiesData];

            response = await giveUserType(token);
            if ('error'===response.type) {
                alert(response.error);
                return;
            }
            const userType = response.userType;

            fuse.current = new Fuse(companiesData, {
                keys: [
                    'name',
                    'address',
                ],
                includeScore: true
            });
            companies.current = companiesData;
            setSearchedCompanies(companiesData);
            setUserType(userType);
        }
        fetchData();
    }, [cookies]);

    const [query, setQuery] = useState('');

    useEffect(() => {
        if (fuse.current) {
            if ('' !== query) {
                const results = fuse.current.search(query);
                const companies = [];
                results.forEach(result => {
                    companies.push(result.item);
                });
                setSearchedCompanies(companies);
            } else
                setSearchedCompanies(companies.current);
        }
    }, [query]);

    if (null === searchedCompanies || null===userType)
        return (<Spinner />);

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
                            {'guest' === userType && <button value={`/worker/application/${company.name}`} onClick={redirectHandler}>apply</button>}
                            {'customer' === userType && <button value={`/customer/placeorder/${company.name}`} onClick={redirectHandler}>place order</button>}
                        </p>
                    )
                })
            }
            {searchedCompanies.length === 0 && <p>no companies found</p>}
        </div>
    )
}
