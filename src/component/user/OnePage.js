import React from 'react'
import MainPage from './MainPage'
import Homepage from './Homepage'

export default function OnePage ( props ){

const setViews = (views,id)=>{
    if( views === "Login_Success")
    {
        setView(<Homepage setViews={setViews} />)
    }
}



    const [ view, setView ] =React.useState(<MainPage setViews ={setViews}/>)

return(
    <div>
        {view}
    </div>
)
}
