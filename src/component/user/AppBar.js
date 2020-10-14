import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { MainUrl } from '../FetchServices'

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import Login from './Login'
import Register from './Register'



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


export default function AppBarArea(props){

    const classes = useStyles();
    
   
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [openSignIn, setOpenSignIn] = React.useState(false);
    const [openSignUp, setOpenSignUp] = React.useState(false);
    const mobileMenuId = 'primary-search-account-menu-mobile'
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   



 

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
     
        <Typography type="Button" style={{color:"white"}} onClick={()=>handleClickOpenSignIn()}> LOGIN</Typography>
        </MenuItem>
        <MenuItem style={{background:"#293659"}}>
      
       <Typography type="Button" style={{color:"white"}} onClick={()=>handleClickOpenSignUp()}> REGISTER</Typography>
        </MenuItem>
      </Menu>
    )}

     

      function desktopBeforeLogin(){
        return(
         <div style={{ display: "flex", paddingRight:"20px"}}>
      
        <Typography type="Button" style={{}} onClick={()=>handleClickOpenSignUp()}> REGISTER</Typography>
              &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
              <Typography type="Button" style={{}} onClick={()=>handleClickOpenSignIn()}> LOGIN</Typography>
       
         </div>
       
        )
       }


       const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
      };
     
     

      const handleClickOpenSignIn = () => {
        setOpenSignIn(true);
      };

      const handleClickOpenSignUp = () => {
        setOpenSignUp(true);
     
      };

      const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
        setOpenSignIn(false);
        setOpenSignUp(false);
        
      };



    return(
        <div>
       
     <div className={classes.grow}>

       <AppBar position="static" className={classes.appbar}>
         <Toolbar>
         
          <div  className={classes.exzoneHeading}>WEL<font style={{color:'#fbb615'}}>CO</font>ME</div>

             
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
       </div>


       <Dialog open={openSignIn} onClose={handleClose} aria-labelledby="form-dialog-title">
      <Login  setViews={props.setViews}/>
 </Dialog>

 <Dialog open={openSignUp} onClose={handleClose} aria-labelledby="form-dialog-title">
      <Register />
 </Dialog>
       </div>
    )
}