import { createContext, useContext, useState } from "react";
import { themeOptions } from "../Styles/them";
const ThemeContext=createContext();

export const ThemeContextProvider=({children})=>{
    const defaultTheme=JSON.parse(localStorage.getItem('theme'))||themeOptions[0].value;
    console.log(defaultTheme);
    
    const [theme,setTheme]=useState(defaultTheme);
    
    const values={theme,setTheme,defaultTheme};
    
    return (<ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>)
}

export const useTheme=()=>useContext(ThemeContext);