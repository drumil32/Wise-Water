const hireWorker = async (token, workerApplication) => {
    try {

        const response = await fetch(`/api/owner/hire-worker`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ workerApplication }),
        });
        const data = await response.json();
        if (data.type === 'error')
            throw (data.message);
        else {
            return {
                type : 'success'
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error
        })
    }
}

export { hireWorker };