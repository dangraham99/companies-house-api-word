const endpoint = "http://localhost:8081/company"



const getCompanyInfo = async (companyNumber) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    try {
        const response = await fetch(endpoint + `/${companyNumber}`, requestOptions)

        const result = await response.json()
        return result
    }

    catch (error) {
        console.log('error', error);
        throw error
    }



}

export { getCompanyInfo };