

const BackEndUrl='https://services.fizrobotics.com/admin' 

const postData =async(url,body)=>{
    try{
        var response =await fetch(`${BackEndUrl}/${url}`,{
            method:'post',
            mode:'cors',
            body:JSON.stringify(body),
            headers:{'content-type':"application/json;charset=utf-8"}
        })
        var result = await response.json()
        return(result)
    }catch(e){
        return(false)
}}

/*const postDataAndImage=async(url,formData,config)=>{
    try{
            const response=await axios.post(`${BackEndUrl}/${url}`,formData,config)
            var result=response.data.RESULT
            return(result)
    }catch(e){
          return(false)
    }
}
*/

export {postData};