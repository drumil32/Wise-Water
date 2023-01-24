const giveUserData = async (userType, token) => {
    try {
        const response = await fetch(`/api/${userType}/profile`, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            // body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (data.type === 'error')
            throw new Error(data.message);
        else {
            const responseObject = {
                type : 'data',
                userData : data.userData,
            }
            if( 'customer'!==userType ){
                responseObject.companyData = data.companyData
            }
            return (responseObject);
        }
    } catch (error) {
        return ({
            type: 'error',
            error: error
        })
    }
}

export { giveUserData };