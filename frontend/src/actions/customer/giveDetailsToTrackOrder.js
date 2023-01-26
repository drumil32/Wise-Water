const giveDetailsToTrackOrder = async (token,order_id) => {
    try {
        const response = await fetch(
            `/api/customer/track-order`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ order_id: order_id }),
            }
        );
        const data = await response.json();
        console.log(data);
        if (undefined !== data.error)
            throw new Error(data.error);
        else {
            return {
                type: 'data',
                order: data.order,
                worker : data.worker
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { giveDetailsToTrackOrder };