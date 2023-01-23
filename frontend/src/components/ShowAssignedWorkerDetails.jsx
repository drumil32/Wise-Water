import React from 'react'

export default function ShowAssignedWorkerDetails({worker}) {
    console.log("worker from customer track order", worker)
    return (
        <div>
            <p>Worker name: {worker[0].firstname} {worker[0].lastname}</p>
            <p>Worker Contact: {worker[0].contact}</p>
            <p>Worker Email: {worker[0].email}</p>
        </div>
    )
}
