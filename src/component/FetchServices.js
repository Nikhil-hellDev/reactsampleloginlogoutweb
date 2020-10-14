const axios = require('axios')
const BaseUrl='https://services.fizrobotics.com/api/Olympiad' 
const nasaUrl = 'https://api.nasa.gov/planetary'
const BaseUrlAdmin='http://127.0.0.1:8000/admin'
const MainUrl='http://localhost:3000'


const postData=async(url,body)=>{
    try{
          var response=await fetch(`${BaseUrl}/${url}`,{
       
             method:'post',
             mode:'cors',
             body:JSON.stringify(body),
             headers:{'content-type':"application/json;charset=utf-8"}
         })
         var result=await response.json()
         return(result)
    }catch(e){
        return(false)
    }
}

const postDataNasa=async(url,body)=>{
    try{
          var response=await fetch(`${nasaUrl}/${url}`,{
       
             method:'post',
             mode:'cors',
             body:JSON.stringify(body),
             headers:{'content-type':"application/json;charset=utf-8"}
         })
         var result=await response.json()
         return(result)
    }catch(e){
        return(false)
    }
}


const postDataAndImage=async(url,formData,config)=>{
    try{
            const response=await axios.post(`${BaseUrl}/${url}`,formData,config)
            var result=response.data.RESULT
            return(result)
    }catch(e){
          return(false)
    }
}


const getData=async(url)=>{
    try{
        var response= await fetch(`${BaseUrl}/${url}`,{
            method:'GET',
            mode:'cors',
            headers:{'content-type':"application/json;charset:utf-8"}

        })
        var result=await response.json()
        return(result)
    }catch(e){
        return(false)
    }
}

export  {getData,postDataAndImage,BaseUrl,postData,MainUrl,postDataNasa};