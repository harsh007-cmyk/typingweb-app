import React from 'react'
import AccountIcon from './AccountIcon'
import CompareBtn from './CompareBtn'
import KeyboardIcon from '@mui/icons-material/Keyboard';
function Header() {
  return (
    <div className="header">
        <div className="logo" style={{display:'flex'}}>
           <div className="logoicon">
           <span style={{display:'block',marginRigth:'6px'}}>
            <KeyboardIcon/> TypeMaster 
            </span>
           </div>
            <CompareBtn/>  
        </div>
        <div className="icons">   
        <AccountIcon/>
        </div>
    </div>
  )
}

export default Header