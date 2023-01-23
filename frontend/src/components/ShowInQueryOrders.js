import React from 'react'

export default function ShowInQueryOrders({order}) {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>
                            Issue
                        </th>
                        <td>
                            {order.query}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Worker Name
                        </th>
                        <td>
                            {order.worker_name}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Worker Email
                        </th>
                        <td>
                            {order.worker_email}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            Worker Contact
                        </th>
                        <td>
                            {order.worker_contact}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
