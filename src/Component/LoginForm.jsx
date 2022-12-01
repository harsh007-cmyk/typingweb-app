import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';
import {auth} from '../firebaseConfig';
import errorMapping from '../Utils/Error';
function LoginForm({handleClose}) {
    const{theme}=useTheme();
    const [email,setEmail]=useState('');
    const [password, setPassword] = useState('');
    const{setAlert}=useAlert();
    const handleSubmit=()=>{
        if(!email||!password){
           setAlert({
            open:true,
            type:'warning',
            message:'please enter all details'
           })
           return;
        }
        auth.signInWithEmailAndPassword(email,password).then((ok)=>{
           setAlert({
                open: true,
                type: 'success',
                message: 'Logged in'
            })
            handleClose();
        }).catch((err)=>{
            setAlert({
                open: true,
                type: 'error',
                message: errorMapping[err.code] || "Some error occured"
            });
        })
    }
  return (
    <Box
        p={3}
        style={{
            
            display:'flex',
            flexDirection:'column',
            gap:'20px',
            backgroundColor:'transparent',
            padding:10,
            marginTop: '5px'
        }}
    >
        <TextField variant='standard' type='email' label='Enter Email' onChange={(e)=>setEmail(e.target.value) }
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
        ></TextField>
        <TextField
            variant='standard'
            type='password'
            label='Enter password'
            InputLabelProps={{
                style:{
                    color:theme.title
                }
            }}
            InputProps={{
                style:{
                    color: theme.title
                }
            }}
            onChange={(e)=> setPassword(e.target.value)}
            ></TextField>
         
         <Button
        variant='contained'
        size='large'
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
        onClick={handleSubmit}>
            Login
        </Button>
    </Box>
  )
}

export default LoginForm