import React ,{useEffect}from 'react'
import AppBar from './AppBar'
import { makeStyles } from '@material-ui/core/styles';
import {Carousel} from 'react-bootstrap'
import ReactDOM from 'react-dom';
import ReactFullpage from '@fullpage/react-fullpage';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme)=>({

body : {
  fontFamily : 'Arial, Helvetica, sans-serif ',
  backgroundColor : 'white',
  color: '#fff',
  lineHeight : 1.6,
  height: '100vh',
transition : 'all 0.2s'
  
},

container :{
    width : '100%',
    height : '100%',
   transform: 'translate3d(0px, 0px, 0px)'
},

carousel:{
  width:'100%'
},




courosel_images :{
 width:'1518px',
 height: '100vh',
 [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '100vh'
    
  },
},


}));

export default function MainPage( props ){
    const classes = useStyles();

 const [token, setToken] = React.useState('');

useEffect(()=>{
setToken(localStorage.getItem("token"));
},[])



function desktopAfterLogin (){
return(
<Redirect to='/Homepage'/>
)
}

function desktopBeforeLogin (){
return(
 
    <div className={classes.body}>
        <AppBar setViews={props.setViews}/>


        <ReactFullpage
          //fullpage options
          licenseKey = {'YOUR_KEY_HERE'}
          scrollingSpeed = {1000} /* Options here */
      
          render={({ state, fullpageApi }) => {
            return (

              <ReactFullpage.Wrapper>


 <div className="section" >
           
             <Carousel className={classes.carousel}>
  

  <Carousel.Item>
 <img
     src="https://storage.googleapis.com/frs-assests/exzone-courosel-images/Carousel2.jpg"
      alt="HW SAVER"
    />
</Carousel.Item>

</Carousel>
</div>



      
</ReactFullpage.Wrapper>

);
     }}
   />


    </div>
);
}

return(


  <div className={classes.body}>
  <AppBar setViews={props.setViews}/>


  <ReactFullpage
    //fullpage options
    licenseKey = {'YOUR_KEY_HERE'}
    scrollingSpeed = {1000} /* Options here */

    render={({ state, fullpageApi }) => {
      return (

        <ReactFullpage.Wrapper>


<div className="section" >
     
       <Carousel className={classes.carousel}>


<Carousel.Item>
<img
src="https://storage.googleapis.com/frs-assests/exzone-courosel-images/Carousel2.jpg"
alt="HW SAVER"
/>
</Carousel.Item>

</Carousel>
</div>




</ReactFullpage.Wrapper>
      );}}
      />
      </div>

)

}