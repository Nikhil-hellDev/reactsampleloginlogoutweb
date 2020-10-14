import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Spinner from 'react-bootstrap/Spinner'
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {postData} from '../FetchServices'
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  
  paper: {
     margin: theme.spacing(4, 2),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#293659",
    
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background:'#293659'
  },
}));

export default function Register(props) {
   const classes = useStyles();
   const[useremail,setuserEmail]=React.useState('')
   const[userpassword,setuserPassword]=React.useState('')
const[username,setuserName]=React.useState('')
   const[Message,setMessage]=React.useState('') 
   const [signInButton, setsignInButton] = React.useState(true)

   const submitData=async()=>{
    let body={ 'email':useremail,
              'Password':userpassword,
         'username':username,
            }
console.log(body);       
           setsignInButton(false) 
     //let result=await postData('Login/',body)
  /*  
  if(result.result === "true")
  { 

      delete result.result
       
      
      localStorage.setItem('STUDENT_IN',JSON.stringify(result))
      let body ={
        'studentID': result.studentID
      }
      
    
      props.setViews('Login_Success',body);
    


    
  }
  else{
    setsignInButton(true)
    setMessage(<font color="red">Email id not exist otherwise wrong credentials...</font>)
  }
*/
    }
   
   
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
     <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
          <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

      
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="useremail"
              label="email"
              name="useremail"
              value={useremail}
              autoComplete="email"
              autoFocus
              onChange={(event)=>setuserEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userpassword"
              label="Password"
              type="password"
              id="userpassword"
              value={userpassword}
              autoComplete="current-password"
              onChange={(event)=>setuserPassword(event.target.value)}
            />
          
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="UserName"
              name="username"
              value={username}
              autoFocus
              onChange={(event)=>setuserName(event.target.value)}
            />


            {signInButton ?

<Button
type="submit"
fullWidth
variant="contained"
color="primary"
className={classes.submit}
onClick={submitData}
>
Sign In
</Button>
:
<Button variant="contained" fullWidth color="primary" className={classes.submit} >
<Spinner
as="span"
variant="white"
animation="grow"
size="sm"
role="status"
aria-hidden="true"
/>
Loading...
</Button>

}


            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
            </Grid>
          <Typography>
      {Message}
    </Typography>
        </Paper>
      
    </Container>
  );
}