import React from 'react'
import AddressDetails from '../details/AddressDetails'


export default function ShowOrder({order}) {
    return (
        <div>
            <p>water type {order.water_type}</p>
            <p>water temperature {order.water_temperature}</p>
            <p>water quantity {order.water_quantity}</p>
            <p>company name {order.company_name}</p>
            
            <AddressDetails address={order.address} />
            {order.status && <p>status {order.status}</p>}
        </div>
    )
}
