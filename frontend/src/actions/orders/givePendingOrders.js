const givePendingOrders = async (token) => {
    try {
        const response = await fetch(
            `/api/owner/show-pending-orders
            `,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        const data = await response.json();
        if ('error' === data.type)
            throw new Error(data.message);
        else {
            return {
                type: 'data',
                pendingOrderList: data.pendingOrderList
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { givePendingOrders };