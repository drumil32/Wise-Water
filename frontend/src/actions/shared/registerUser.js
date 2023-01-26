const registerUser = async (userType, userObj) => {
    try {
        const response = await fetch(`/api/${userType}/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        });
        const data = await response.json();
        if (undefined !== data.error)
            throw new Error(data.error.errorMessage);
        else {
            return {
                type: 'data',
                token: data.token
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { registerUser };