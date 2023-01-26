const submitJobApplication = async (userData) => {
    try {
        const response = await fetch(`/api/user/submit-job-application`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        console.log(data);
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

export { submitJobApplication };