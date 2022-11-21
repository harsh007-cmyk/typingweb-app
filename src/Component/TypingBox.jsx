import React,{createRef, useEffect,useState} from 'react'
import { useRef } from 'react';
function TypingBox({words}) {
  console.log("rendering");
  const inputTextRef=useRef(null);
  const [currentwordIndex,setCurrentwordIndex]=useState(0);
  const [currentCharIndex,setCurrentCharIndex]=useState(0);
  const wordSpanRef=Array(words.length).fill(0).map(i=>createRef(null));
  let [countDown,setCountDown]=useState(15);
  const [testStart, setTestStart] = useState(false);
  const [testOver,setTestOver]=useState(false);
  console.log(countDown);
  let timeCount=15;
  // const typingTimer=()=>{
  //   const intervalId=setInterval(timer,1);
  //   function timer(){
  //     setCountDown(countDown--);
  //     if(countDown<0){
  //       clearInterval(intervalId);
  //     }
     
  //   }
  // }

  const typingTimer=()=>{
    const intervalId=setInterval(timer,1000);
    function timer(){
      setCountDown(prev=>{
        if(prev===1){
          clearInterval(intervalId);
          setCountDown(0);
          setTestOver(true)
        }else{
          return prev-1;
        }
      })
    }
  }
  


  const handleKeyDown=(e)=>{
    
    if(!testStart){
      typingTimer();
      setTestStart(true);
    }
    
    let allChildrenSpans=wordSpanRef[currentwordIndex].current.querySelectorAll('span');
   

    if(e.keyCode===32){    
      console.log("space");

      if(allChildrenSpans.length<=currentCharIndex){
        allChildrenSpans[currentCharIndex-1].classList.remove('right');
      }else{
        allChildrenSpans[currentCharIndex].className=allChildrenSpans[currentCharIndex].className.replace('current','');
      }
      setCurrentwordIndex(currentwordIndex+1);
      setCurrentCharIndex(0);
      return ;
    }
    console.log(e.keyCode,"code");

    if(e.keyCode===8){

      if(currentCharIndex!=0){
          
        if(currentCharIndex===allChildrenSpans.length){
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

    if(e.key===allChildrenSpans[currentCharIndex].innerText){
      allChildrenSpans[currentCharIndex].className="char correct";
    }else{
      allChildrenSpans[currentCharIndex].className="char not_correct";
    }
    
    if(currentCharIndex+1===allChildrenSpans.length){
      allChildrenSpans[currentCharIndex].className+=' right';
    }else{
    allChildrenSpans[currentCharIndex+1].className='char current';
    }
    setCurrentCharIndex(currentCharIndex+1);
    
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
    
   {(!testOver)?
    (<><h1>{countDown}</h1>
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
</div></>)

    :     ( <h1 style={{textAlign:"center"}}>Test Over</h1>)}
    
   
    <input type="text" className='hidden-input' ref={inputTextRef}
      onKeyDown={((e)=>handleKeyDown(e))}
    />
    </>
  )
}

export default TypingBox