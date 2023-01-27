const giveWorkerDelieveredOrders = async (token) => {
    try {
        const response = await fetch(
            `/api/worker/show-delievered-orders`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            }
        );
        const data = await response.json();
        if (undefined !== data.error)
            throw new Error(data.error.errorMessage);
        else {
            return {
                type: 'data',
                delieveredOrders: data.delieveredOrders
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { giveWorkerDelieveredOrders };