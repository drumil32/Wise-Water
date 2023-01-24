const assignOrder = async ({ token, worker_id, order_id}) => {
    console.log(token)
    console.log(worker_id)
    console.log(order_id)
    try {
        const response = await fetch(`/api/owner/assign-order`, {
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({worker_id,order_id})
        });
        const data = await response.json();
        if (data.type === 'error')
            throw new Error(data.message);
        else {
            return {
                type: 'data',
                workers: data.workers,
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error
        })
    }
}

export { assignOrder }