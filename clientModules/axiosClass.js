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
        /*
        This is an attempt to append Accept and Content-Type headers even if it is not passed from consumer. 
        If anyone wants this feature, they can uncomment this portion.
        
        if (Object.keys(headers).length > 0 ){
            this.headers = headers
        }
        
        else{
            updatedHeaders = {
                'Accept': 'application/json',
                'Content-Type' : 'application/json',
              }
            this.headers = updatedHeaders
        }
        */

        
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

        let res =  await axios(this.config, this.params, this.headers);
        /*
        I had plan to use Interceptors to give some advanced features. Hopefully I will manage some time to do so. 
        */
        let data = res.data;
        return data

    }



}

module.exports = {
    Request:Request
}