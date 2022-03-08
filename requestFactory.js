const axiosClient = require('./axiosClass.js')
const fetchClient = require('./fetchClass.js')

const requestFactory = (clientType = 'axios') => {
    if (clientType ===  'axios'){
        return new axiosClient.Request
    }
    else if (clientType === 'node-fetch') {
        return new fetchClient.Request

    } else {
        return new axiosClient.Request
    }
}


module.exports = requestFactory