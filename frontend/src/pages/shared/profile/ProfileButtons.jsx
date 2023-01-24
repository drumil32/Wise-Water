import React from 'react'

function ProfileButtons({userType,redirectHandler}) {

    

    return (
        <div>

            {/* owner button */}
            {
                'owner' === userType && <>
                    <button onClick={redirectHandler} value="/show-companies">Show companies</button>
                    <button onClick={redirectHandler} value="/owner/show-pending-orders">Show pending orders</button>
                    <button onClick={redirectHandler} value="/owner/show-assigned-orders">show assigned orders</button>
                    <button onClick={redirectHandler} value="/owner/show-in-query-orders">Worker Order Query</button>
                    <button onClick={redirectHandler} value="/owner/show-worker-applications">show worker application</button>
                </>
            }

            {/* customer */}
            {
                'customer' === userType && <>
                    <button onClick={redirectHandler} value="/show-companies">Show companies</button>
                    <button onClick={redirectHandler} value="/customer/show-placed-orders">My orders</button>
                </>
            }

            {/* worker */}
            {
                'worker' === userType && <>
                    <button onClick={redirectHandler} value="/worker/orders/assigned">show assigned orders</button>
                    <button onClick={redirectHandler} value="/worker/orders/delievered">show delievered Orders</button>
                </>
            }
        </div>
    )
}

export default ProfileButtons