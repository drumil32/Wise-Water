const giveWorkerApplications = async (token) => {
    try {
        const response = await fetch(`/api/owner/showWorkerApplications`, {
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
                type: 'data',
                workerApplications: data.workerApplications,
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error
        })
    }
}

export { giveWorkerApplications };