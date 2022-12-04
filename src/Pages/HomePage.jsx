import React from 'react'
import Footer from '../Component/Footer'
import Header from '../Component/Header'
import TypingBox from '../Component/TypingBox'
import { GlobalStyles } from '../Styles/global'

function HomePage() {

  return (
    
    <div className="canvas">
      
      <GlobalStyles/>
     <Header/>
      
      <TypingBox />
      <Footer/>
     
    </div>
  
  )
}

export default HomePage     