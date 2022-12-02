import React from 'react'
import AccountIcon from './AccountIcon'

function Header() {
  return (
    <div className="header">
        <div className="logo" style={{display:'flex'}}>
            <span style={{display:'block',marginRigth:'6px'}}>
              Typing Test
            </span>
        </div>
        <div className="icons">
        <AccountIcon/>
        </div>
    </div>
  )
}

export default Header