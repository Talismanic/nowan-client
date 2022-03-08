const axiosClient = require('./axiosClass.js')
const fetchClient = require('./fetchClass.js')
const requestFactory = require('./requestFactory.js')

// mock server url for post test:
//https://c58a39a4-5ced-4a0b-a499-8e90c0309eae.mock.pstmn.io/users

// mock server url for get test with 5s delay:
// https://28a6fc1a-121b-4a7d-8384-ffbcff4f3445.mock.pstmn.io/user?id=2

// const config = {
//     url: 'https://c58a39a4-5ced-4a0b-a499-8e90c0309eae.mock.pstmn.io/users',
//     method: 'post'
// }


// const config = {
//     url: 'https://28a6fc1a-121b-4a7d-8384-ffbcff4f3445.mock.pstmn.io/user',
//     method: 'get'
// }

const config = {
    url: 'https://httpbin.org/get',
    method: 'get'
}

const params = {
    answer : 42
}

// const params = {
//     id : 2
// }


const headers = {
    'Content-Type' : 'application/json',
    'customHeader1': 'ca1',
    'Accept': 'application/json'
}


const r1 = requestFactory()


r1.setUrl(config.url)
    .setMethod(config.method)
    .setParams(params)
    .setHeaders(headers)
    .setTimeOut(10000)
    .setUserAgent('testmachine')
    .setBasicAuth("mehedi", "hasan")

r1.makeRequest().then( resp => {
    console.log(resp)
}).catch(err => {
    console.log(err)
})