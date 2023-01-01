import React, { useEffect, useState, useRef } from 'react';
import Spinner from '../components/Spinner';
import Fuse from 'fuse.js';

//  not 100% sure how this code works

function ShowCompnaies() {
    console.log(Fuse)
    const [compnaies, setCompnaies] = useState([]);
    const fuse = useRef(null);
    useEffect(() => {
        const fun = async () => {
            const response = await fetch(`http://localhost:3001/api/user/showCompnaies`);
            const data = await response.json();
            
            fuse.current = new Fuse(data.companies, {
                keys: [
                    'name',
                    'address',
                ],
                includeScore: true
            });
            // console.log(fuse);
            setCompnaies(data.companies);
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
            setCompnaies(temp);
        }else{
            console.log("here")
        }
    }, [fuse, query]);

    if (0 === compnaies.length)
        return (<Spinner />);

    return (
        <div>
            <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} value={query} />
            {
                compnaies.map((compnay, index) => {
                    return <p key={index}>{compnay.name}</p>
                })
            }
        </div>
    )
}

export default ShowCompnaies