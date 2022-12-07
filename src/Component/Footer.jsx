import React from 'react';
import Select from 'react-select';
import { themeOptions } from '../Styles/them';
import {useTheme} from '../Context/ThemeContext';
import GitHubIcon from '@mui/icons-material/GitHub';   
function Footer() {
    const {theme,setTheme,defaultTheme} = useTheme();

   function handleChange(e){
    setTheme(e.value);
    localStorage.setItem('theme',JSON.stringify(e.value));
   }
  return (
    <div className='footer'>
        <div className="instructions">
            <div className="hint">
                press <kbd>Tab</kbd> to open commands
            </div>
        </div>
        <div className="actual-footer">
            <div className="footer-links">
               <a href="https://github.com/harsh007-cmyk/typingweb-app"><GitHubIcon color='secondary'/></a>
            </div>
            <div className="theme-options">
            <Select options={themeOptions} menuPlacement='top' onChange={handleChange} defaultValue={{value:defaultTheme.value,label:defaultTheme.label}}
            styles={
                {
                    control:(styles)=>({...styles,backgroundColor:theme.background,border:'none',cursor:'pointer'}),
                    menu:(styles)=>({...styles,minWidth:'150px',backgroundColor:theme.background,cursor:'pointer'})  
                }
            }
            />
            </div>
            
        </div>
    </div>
  )
}

export default Footer    