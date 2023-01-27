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
        if (undefined !== data.error)
            throw new Error(data.error.errorMessage);
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