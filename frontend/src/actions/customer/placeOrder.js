const placeOrder = async (token, order) => {
    try {
        const response = await fetch(`/api/customer/placeorder`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({order})
        });
        const data = await response.json();
        if ( undefined!== data.error)
            throw new Error(data.error.errorMessage);
        else {
            return {
                type: 'success',
            }
        }
    } catch (error) {
        return ({
            type: 'error',
            error,
        })
    }
}

export { placeOrder };