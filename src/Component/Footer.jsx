import React from 'react';
import Select from 'react-select';
import { themeOptions } from '../Styles/them';
import {useTheme} from '../Context/ThemeContext';
function Footer() {
    const {theme,setTheme,defaultTheme} = useTheme();

   function handleChange(e){
    setTheme(e.value);
    localStorage.setItem('theme',JSON.stringify(e.value));
   }
  return (
    <div className='footer'>
        <div className="footer-links">
            Links
        </div>
        <div className="theme-options">
            <Select options={themeOptions} menuPlacement='top' onChange={handleChange} defaultValue={{value:defaultTheme.value,label:defaultTheme.label}}
            styles={
                {
                    control:(styles)=>({...styles,backgroundColor:theme.background}),
                    menu:(styles)=>({...styles,backgroundColor:theme.background})
                }
            }
            />
        </div>
    </div>
  )
}

export default Footer