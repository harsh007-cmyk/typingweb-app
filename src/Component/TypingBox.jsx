import React,{createRef, useEffect,useState} from 'react'
import { useRef } from 'react';
function TypingBox({words}) {
  console.log("rendering");
  const inputTextRef=useRef(null);
  const [currentwordIndex,setCurrentwordIndex]=useState(0);
  const [currentCharIndex,setCurrentCharIndex]=useState(0);
  const wordSpanRef=Array(words.length).fill(0).map(i=>createRef(null));


  




  // console.log("wordSpanRef",wordSpanRef);
  const handleKeyDown=(e)=>{
    let allChildrenSpans=wordSpanRef[currentwordIndex].current.querySelectorAll('span');
    // console.log("key",e);
    console.log(" currentwordIndex:",currentwordIndex,", currentCharIndex: ",currentCharIndex);

    if(e.keyCode===32){    
      console.log("space");

      if(allChildrenSpans.length<=currentCharIndex){
        console.log("hellow");
        allChildrenSpans[currentCharIndex-1].classList.remove('right');
        
      }else{
        console.log("dfja;sd", allChildrenSpans[currentCharIndex].innerText);
        allChildrenSpans[currentCharIndex].className=allChildrenSpans[currentCharIndex].className.replace('current','');
      }
      setCurrentwordIndex(()=>{
        console.log("set current word index");
        return currentwordIndex+1;
      });
      console.log(" currentwordIndex:",currentwordIndex,", currentCharIndex: ",currentCharIndex);
      setCurrentCharIndex(()=>{
        console.log("change char Index to 0",currentCharIndex);
        
        return 0;
      });
      return ;
    }
    console.log(e.keyCode,"code");

    if(e.keyCode===8){

      if(currentCharIndex!=0){
          
        if(currentCharIndex===allChildrenSpans.length){
          console.log('back space',currentCharIndex);
          if(allChildrenSpans[currentCharIndex-1].className.includes('extra')){
            allChildrenSpans[currentCharIndex-1].remove();
            allChildrenSpans[currentCharIndex-2].className+=' right';
          }else{
            allChildrenSpans[currentCharIndex-1].className='char current';
        }
        setCurrentCharIndex(currentCharIndex-1);
        return;
        }
          allChildrenSpans[currentCharIndex].className='char';
          allChildrenSpans[currentCharIndex-1].className='char current';
          setCurrentCharIndex(currentCharIndex-1);
     
      }

      return;
    }


    if(currentCharIndex===allChildrenSpans.length){
      let newSpan=document.createElement('span');
      newSpan.innerText=e.key;
      newSpan.className='char not_correct right extra';
      allChildrenSpans[currentCharIndex-1].className=allChildrenSpans[currentCharIndex-1].className.replace('right','');
      wordSpanRef[currentwordIndex].current.append(newSpan);
      setCurrentCharIndex(currentCharIndex+1);
      return;
    }

    // console.log(allChildrenSpans,"all children");  
    console.log("current",wordSpanRef[currentwordIndex].current.innerText);  
    console.log("current",wordSpanRef[currentwordIndex]);  
    console.log("key pressed",e.key);  
    if(e.key===allChildrenSpans[currentCharIndex].innerText){
      console.log("user pressed currect");
      allChildrenSpans[currentCharIndex].className="char correct";
    }else{
      console.log("not current");
      allChildrenSpans[currentCharIndex].className="char not_correct";
    }
    
    if(currentCharIndex+1===allChildrenSpans.length){
      allChildrenSpans[currentCharIndex].className+=' right';
    }else{
    allChildrenSpans[currentCharIndex+1].className='char current';
    }
    setCurrentCharIndex(()=>{
      console.log("current char index update",currentCharIndex);
      console.log("sett current Char");
      return currentCharIndex+1;
    });
    // setTimeout(() => {
    //   console.log(currentCharIndex);
    // }, 1);
  }

const foucusInput=()=>{
  inputTextRef.current.focus();
}

useEffect(()=>{
  foucusInput();
  wordSpanRef[0].current.childNodes[0].className='char current';
},[]);
console.log("---------------------------");
  return (
    <>
    <div className="type-box" onClick={foucusInput}>
        <div className="words">
           {words.map((word,index)=>(
            <span className='word' key={index} ref={wordSpanRef[index]} >

              {word.split("").map((char,idx)=>(
                <span className='char' key={ `${char+idx}`}>{char}</span>
              ))}
            </span>
           ))}
        </div>
    </div>
    <input type="text" className='hidden-input' ref={inputTextRef}
      onKeyDown={((e)=>handleKeyDown(e))}
    />
    </>
  )
}

export default TypingBox