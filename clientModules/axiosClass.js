const axios = require('axios')

class Request {
    
    

    constructor(){

        this.config = {
            url: '',
            method: '',
            timeout: 3000,
            logEnabled : false
        }
    };

    
    setUrl(url){
       
        this.config.url = url
        return this
    }

    setMethod(methodName){
        this.config.method = methodName
        return this
    }

    setParams(params) {
        if (this.config.method !== 'get'){
            this.data = params
        }
        else {
            this.params = params

        }
        
        return this
        
    }

    setUserAgent(userAgent){
        this.headers['User-Agent'] = userAgent
        return this
    }

    setHeaders(headers) {

        // if (Object.keys(headers).length > 0 ){
        //     this.headers = headers
        // }
        
        // else{
        //     updatedHeaders = {
        //         'Accept': 'application/json',
        //         'Content-Type' : 'application/json',
        //       }
        //     this.headers = updatedHeaders
        // }
        this.headers = headers    
        return this
        
    }

    setBasicAuth(user, pass){

        this.config.auth = {
            username: user,
            password: pass
        }

        return this

    }

    setBearerToken (token) {
        let headerName = "Bearer"
        this.headers.Authorization = headerName.concat(' ', token) 
        return this 
    }

    setTimeOut(timeout){
        this.config.timeout = timeout
        return this
    }

    setLogger(value){
        this.logEnabled = value
    }

 

   async makeRequest(){
        // console.log(this.config.url)
        // console.log(this.config.method)
        // console.log(this.params)
        // console.log(this.headers)
        let res =  await axios(this.config, this.params, this.headers);
        // let myClient = axios.create(this.config)

        // if (! this.logEnabled){
        //     let res = await myClient(this.params)
        // }
        // else {
        //     myClient.interceptors.request.use(request => {
        //         console.log('Starting Request', JSON.stringify(request, null, 2))
        //         return request
        //       })
        //       let res = await myClient(this.params)
        // }
        let data = res.data;
        // console.log(data)
        return data

        // return 6
    }



}

module.exports = {
    Request:Request
}