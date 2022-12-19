import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React,{useState} from 'react'
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';
import {auth,db} from '../firebaseConfig';
import errorMapping from '../Utils/Error';
function SignUP({handleClose}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[username,setUsername]=useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const{setAlert}=useAlert();
    const{theme}=useTheme();
    
    const checkUserandNameAvailability = async()=>{
        const ref = db.collection('usernames').doc(`${username}`);
        const response = await ref.get();
        return !response.exists;
    }


    
    const handleSubmit=async()=>{
        if(!email || !password || !confirmPassword){
            setAlert({
                open: true,
                type: 'warning',
                message: 'Please enter all details'
            });
            return;
        }
        if(password!==confirmPassword){
            setAlert({
                open: true,
                type: 'warning',
                message: 'Password Mismatch'
            });
            return;
        }
    

        if(await checkUserandNameAvailability()){
            auth.createUserWithEmailAndPassword(email,password).then(
                async(result)=>{
                      const ref=await db.collection('usernames').doc(`${username}`).set({
                        uid:result.user.uid
                      }).then((response)=>{
                        setAlert({
                            open: true,
                            type: 'success',
                            message: 'Account created'
                        });
                        handleClose();
                      })
                     
                  }
              ).catch((err)=>{
                  setAlert({
                      open: true,
                      type: 'error',
                      message: errorMapping[err.code] || "Some error occured"
                  });
              }
              )
        }else{
            setAlert({
                open:true,
                type:'warning',
                message:'username already taken'
            });
        }
        
    }
  return (
    <Box
    p={3}
    style={{
        display:'flex',
        flexDirection:'column',
        gap:'20px',
        backgroundColor:'transparent',
        padding:10
    }}    
>

    <TextField
        variant='outlined'
        type='email'
        label='Enter Username'
        onChange={(e)=>setUsername(e.target.value)}
        InputLabelProps={
            {
                style:{
                    color:theme.title
                }
            }
        }
    >
    </TextField>

    <TextField
        variant='outlined'
        type='email'
        label='Enter Email'
        onChange={(e)=>setEmail(e.target.value)}
        InputLabelProps={
            {
                style:{
                    color: theme.title
                }
            }
        }
        InputProps={{
            style:{
                color: theme.title
            }
        }}
    >

    </TextField>
    <TextField
        variant='outlined'
        type='password'
        label='Enter password'
        InputLabelProps={
            {
                style:{
                    color: theme.title
                }
            }
        }
        InputProps={{
            style:{
                color: theme.title
            }
        }}
        onChange={(e)=>setPassword(e.target.value)}>

    </TextField>
    <TextField
        variant='outlined'
        type='password'
        label='Confirm password'
        InputLabelProps={
            {
                style:{
                    color: theme.title
                }
            }
        }
        InputProps={{
            style:{
                color: theme.title
            }
        }}
        onChange={(e)=>setConfirmPassword(e.target.value)}>

    </TextField>
   
    <Button
    variant='contained'
    size='large'
    style={{backgroundColor:theme.title, color: theme.background}}
    onClick={handleSubmit}>
        Signup
    </Button>
</Box>
  )
}

export default SignUP