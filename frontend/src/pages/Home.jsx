import React from 'react';
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/customer/register">Sign Up as Customer</Link>
                </li>
                <li>
                    <Link to="/owner/register">Sign Up as Owner</Link>
                </li>
                <li>
                    <Link to="/show-companies">Apply for job</Link>
                </li>
            </ul>
        </div>
    )
}

