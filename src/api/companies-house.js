const endpoint = "https://companieshouseproxy.azurewebsites.net/api/GetCompanyDetails?code=7aHuIoF3BugXdwISAgKmo_gboQ8P29Q_OeIFP9R7lvScAzFu27q8iA=="



const getCompanyInfo = async (companyNumber) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    try {
        const response = await fetch(endpoint + `&companyNumber=${companyNumber}`, requestOptions)

        const result = await response.json()

        return result
    }

    catch (error) {
        console.log('error', error);
        throw error
    }



}

export { getCompanyInfo };