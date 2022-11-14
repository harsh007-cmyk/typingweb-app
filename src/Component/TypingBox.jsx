import React from 'react'

function TypingBox({words}) {
  return (
    <>
    <div className="typebox">
        <div className="words">
            {words.map(words,index)=>(
                <span className='word'>{words}</span>
                    
            
                )
            
                
            
        </div>
    </div>
    </>
  )
}

export default TypingBox