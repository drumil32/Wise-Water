const giveWorkerDetails = async (token) => {
    try {
        const response = await fetch(`/api/owner/show-workers`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (data.type === 'error')
            throw new Error(data.message);
        else {
            return {
                type : 'data',
                workers : data.workers,
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error
        })
    }
}

export { giveWorkerDetails };