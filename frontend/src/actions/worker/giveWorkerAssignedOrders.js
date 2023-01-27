const giveWorkerAssignedOrders = async (token) => {
    try {
        const response = await fetch(
            `/api/worker/show-assigned-orders`,
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
                assignedOrders: data.assignedOrders
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { giveWorkerAssignedOrders };