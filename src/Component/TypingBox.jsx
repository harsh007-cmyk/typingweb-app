import React from 'react'

function TypingBox({words}) {
  const inputTextReff=useRef(null);
  return (
    <>
    <div className="type-box">
        <div className="words">
           {words.map((word,index)=>(
            <span className='word'>

              {word.split("").map((char,idx)=>(
                <span className='char'>{char}</span>
              ))}
            </span>
           ))}
        </div>
    </div>
    <input type="text" className='hidden-input'/>
    </>
  )
}

export default TypingBox