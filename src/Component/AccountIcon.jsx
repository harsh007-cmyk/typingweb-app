import React, { useState } from 'react'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { AppBar,Modal, Tabs,Tab, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LoginForm from './LoginForm';
import SignUP from './SignUP';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../firebaseConfig';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAlert } from '../Context/AlertContext';
import { useTheme } from '../Context/ThemeContext';
const useStyles = makeStyles(()=>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(2px)'
    },
    box: {
        width: 400,
        textAlign: 'center',
        border: '1px solid'
    }
}))

function AccountIcon() {
    const [open,setOpen]=useState(false);
    const [value,setValue]=useState(0);
    const handleValueChange=(e,v)=>{
        console.log("harsh")
            setValue(v);
    }
    const handleClose=()=>{
        setOpen(false);
    }
    const classes = useStyles();
    const [user] = useAuthState(auth);
    const navigate=useNavigate();
    const handleAccountClick=()=>{
        if(user){
            navigate('/user');
        }
        else{
            setOpen(true);
        }
    }
const Logout=()=>{
    auth.signOut().then((ok)=>{
        alert('Logged Out')
    }).catch((err)=>{
        alert("Not able to logout");
    })
}

    const {setAlert}=useAlert();
    const {theme}=useTheme();
    const googleProvider=new GoogleAuthProvider();
    const signINWithgoogle=()=>{
                signInWithPopup(auth,googleProvider).then((res)=>{
                    setAlert({
                        open: true,
                        type: 'success',
                        message: 'Logged in'
                    });
                    handleClose();
                }).catch((err)=>{
                    setAlert({open:true,type:err,message:'not able to use google authentication'})
                })
    }
  return (
    <div>
        <SupervisorAccountIcon onClick={handleAccountClick}/>
        {(user)&&<LogoutIcon onClick={Logout} style={{marginLeft:'5px'}}/>}
        <Modal    open={open}
            onClose={handleClose}
            className={classes.modal}
            
            >
        <div className={classes.box}>
            <AppBar position='static'
            style={{backgroundColor:'transparent'}}
            >
                <Tabs value={value} onChange={handleValueChange} variant='fullWidth'>
                <Tab label='login' style={{color:theme.title}}></Tab>
                <Tab label='signup' style={{color:theme.title}}></Tab>

                </Tabs>
            </AppBar>
            {value===0 && <LoginForm handleClose={handleClose}/>}
            {value===1 && <SignUP handleClose={handleClose}/>}

            <Box>
                <span style={{display:'block',padding:'1rem'}}>OR</span>
                <GoogleButton
                    style={{width:'100%'}}
                    onClick = {signINWithgoogle}
                />
            </Box>
        
        </div>
        </Modal>
    </div>
  )
}

export default AccountIcon