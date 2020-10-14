import React,{useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { MainUrl,postDataNasa } from '../FetchServices'
import {Redirect} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import Login from './Login'
import Register from './Register'
import {Carousel} from 'react-bootstrap'


const useStyles = makeStyles((theme)=>({
    grow: {
        flexGrow: 1,
        
      },


    appbar:{
            backgroundColor: "#293659",
            position: "fixed",
            top:0,
            zIndex: 1,
            display : 'flex',
          },

    title: {
            display: 'block',
            marginLeft:'-30px',
            [theme.breakpoints.down('sm')]: {
              display: 'block',
              marginLeft:'-30px'
            },
          },

    sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
              display: 'flex',
            },
          },
    sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
              display: 'none',
            },
          },
    exzoneHeading :{
          margin:'auto',
          fontWeight:'bold',
          fontSize:'30px',
          [theme.breakpoints.down('sm')]: {
            fontSize:'15px',
          },
    }
}))


export default function Homepage(props){

    const classes = useStyles();
  
   
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [openSignIn, setOpenSignIn] = React.useState(false);
    const [openSignUp, setOpenSignUp] = React.useState(false);
    const mobileMenuId = 'primary-search-account-menu-mobile'
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [token, setToken]= React.useState('');
   

var dataForToken;
 

useEffect(()=>{
  var dataForToken= localStorage.getItem("token");
  setToken(dataForToken)
  
  NasaData()
},[])

const NasaData=async()=>{
 
let body={
'api_key' :'vpezezO07gMa6tOfbnakgcYake7WufQSubb8cHy1'
}
let result=await postDataNasa('apod',body)

console.log(result)
}


 

    function renderMobileMenuBeforeLogin(){
      return(
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        
      >
        <MenuItem style={{background:"#293659"}}>  
     
        <Typography type="Button" style={{color:"white"}}  onClick={()=>handleClickOpenUserData()}>userData</Typography>
        </MenuItem>
        <MenuItem style={{background:"#293659"}}>
      
       <Typography type="Button" style={{color:"white"}} onClick={()=>handleClickOpenLogout()}>Logout</Typography>
        </MenuItem>
      </Menu>
    )}

     

      function desktopBeforeLogin(){
        return(
         <div style={{ display: "flex", paddingRight:"20px"}}>
      
        <Typography type="Button" style={{}} onClick={()=>handleClickOpenUserData()}>UserData</Typography>
              &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
              <Typography type="Button" style={{}} onClick={()=>handleClickOpenLogout()}>Logout</Typography>
       
         </div>
       
        )
       }


       const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
     
     

      const handleClickOpenUserData = () => {
       // window.open='/Home/UserData';
 window.location = '/Home/UserData';
      };

      const handleClickOpenLogout = () => {
        localStorage.removeItem("token");
        setToken('')
      window.location = '/';
      };

      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setOpenSignIn(false);
        setOpenSignUp(false);
        
      };

      const returnLogin = () => {
       return(<Redirect to='/'/>);
        
      };

    return(
      <div>
      
        
       {{token} == null ? 
     {returnLogin}                  
        : 
       <div>
         
       
     <div className={classes.grow}>

     <AppBar position="static" className={classes.appbar}>
       <Toolbar>
       
        <div  className={classes.exzoneHeading}>H<font style={{color:'#fbb615'}}>O</font>ME</div>

           
         <div className={classes.sectionDesktop}>
         {desktopBeforeLogin()}
          
         </div>
         <div className={classes.sectionMobile}>
           <IconButton
             aria-label="show more"
             aria-controls={mobileMenuId}
             aria-haspopup="true"
             onClick={handleMobileMenuOpen}
             color="inherit"
           >
             <MoreIcon />
           </IconButton>
         </div>
         {renderMobileMenuBeforeLogin()}
       </Toolbar>
     </AppBar>
     <Carousel className={classes.carousel}>


     <Carousel.Item>
     <img
     src="https://storage.googleapis.com/frs-assests/exzone-courosel-images/Carousel2.jpg"
     alt="HW SAVER"
     />
     </Carousel.Item>
     
     </Carousel>
     
     </div>
    
       </div>
       }

       </div>
      
      
    )
}