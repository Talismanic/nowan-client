const axiosClient = require('./clientModules/axiosClass.js')
const fetchClient = require('./clientModules/fetchClass.js')

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