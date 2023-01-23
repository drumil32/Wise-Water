import React from 'react'

export default function UserDetails({ userData }) {
    return (
        <div>
            <p>your first name : {userData.firstname}</p>
            <p>your last name : {userData.lastname}</p>
            <p>your email address : {userData.email}</p>
            <p>your Contact number : {userData.contact}</p>
        </div>
    )
}
