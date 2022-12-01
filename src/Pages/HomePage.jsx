import React from 'react'
import { ThemeProvider } from 'styled-components'
import Footer from '../Component/Footer'
import Header from '../Component/Header'
import TypingBox from '../Component/TypingBox'
import { useTheme } from '../Context/ThemeContext'
import { GlobalStyles } from '../Styles/global'

function HomePage() {
    const {theme}=useTheme();
  return (
    <ThemeProvider theme={theme}>
    <div className="canvas">
      
      <GlobalStyles/>
     <Header/>
      
      <TypingBox />
      <Footer/>
     
    </div>
    </ThemeProvider>     
  )
}

export default HomePage     