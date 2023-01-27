const deliverOrder = async (token, order_id) => {
    try {
        const response = await fetch(
            `/api/worker/order-delivered`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ order_id }),
            }
        );
        const data = await response.json();
        if (undefined !== data.error)
            throw new Error(data.error.errorMessage);
        else {
            return {
                type: 'success'
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { deliverOrder };