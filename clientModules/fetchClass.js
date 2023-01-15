const fetch = require('node-fetch');
const abrtCntrlr = require('node-abort-controller')

class Request {
    
    

    constructor(){
        this.url = ''  
        this.timeout = 1000  
        this.options = {
            method: '',
            logEnabled : false
        }
    };

    
    setUrl(url){
       
        this.url = new URL(url)
        return this
    }

    setMethod(methodName){
        this.options.method = methodName
        return this
    }

    setParams(params) {
        if (this.options.method !== 'get'){
            this.options.body = JSON.stringify(params)
        }
        else {
            Object.keys(params).forEach(key => this.url.searchParams.append(key, params[key]))

        }
        
        return this
        
    }

    setUserAgent(userAgent){
        this.options.headers['User-Agent'] = userAgent
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
        this.options.headers = headers    
        return this
        
    }

    setBasicAuth(user, pass){

        let data = user.concat(':',pass)
        let buff = new Buffer.from(data)

        let base64EncodedData = buff.toString('base64')

        let headerName = 'Basic'
        this.options.headers.Authorization = headerName.concat(' ', base64EncodedData)


        return this

    }

    setBearerToken (token) {
        let headerName = "Bearer"
        this.options.headers.Authorization = headerName.concat(' ', token) 
        return this 
    }

    setTimeOut(timeout){
        this.timeout = timeout
        return this
    }

    setLogger(value){
        this.logEnabled = value
    }

 

   async makeRequest(){

        const controller = new abrtCntrlr.AbortController()
        const { signal } = controller;
        const timeoutId = setTimeout( () => controller.abort(), this.timeout)
        try {
            let res =  await fetch(this.url, {signal},this.options);
            clearTimeout(timeoutId);
            let data = await res.json();
            return data

        }
        catch (error) {
            throw Error('TimedOut')

        }
    }

}

module.exports = {
    Request:Request
}