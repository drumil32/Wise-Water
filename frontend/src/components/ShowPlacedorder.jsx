import React from 'react'

export default function ShowPlacedorder({order}) {
    return (
        <div>
            <p>water type {order.water_type}</p>
            <p>water temperature {order.water_temperature}</p>
            <p>water quantity {order.water_quantity}</p>
            <p>company name {order.company_name}</p>
            <h3>address</h3>
            <p>line1 {order.address.line1}</p>
            <p>line2 {order.address.line2}</p>
            <p>city {order.address.city}</p>
            <p>pincde {order.address.pincode}</p>
            <p>state {order.address.state}</p>
        </div>
    )
}
