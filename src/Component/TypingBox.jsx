import UpperMenu from './UpperMenu';
import React,{createRef, useEffect,useMemo,useState} from 'react'
import { useRef } from 'react';
import { useTestMode } from '../Context/TestMode';
import Stat from './Stat';
var randomwords=require('random-words');
function TypingBox({}) {
  const inputTextRef=useRef(null);
  const [currentwordIndex,setCurrentwordIndex]=useState(0);
  const [currentCharIndex,setCurrentCharIndex]=useState(0);
  const [correctChars,setCorrectChars]=useState(0);
  const [correctWords,setCorrectWords]=useState(0);
  let [countDown,setCountDown]=useState(15);
  const [testStart, setTestStart] = useState(false);
  const [testOver,setTestOver]=useState(false);
  const {testTime}=useTestMode();
  const[intervalId,setIntervalId]=useState(null);
  

  const [wordsArray,setWordArray]=useState(()=>{
    return randomwords(100);
  })

  const words=useMemo(()=>{
    return wordsArray;
  },[wordsArray])
 

  const wordSpanRef=useMemo(()=>{
    console.log("refenter")
    return Array(words.length).fill(0).map(i=>createRef(null));
  },[words]);
  console.log(wordSpanRef);
  
  const resetWordSpanRefClassNames=()=>{
    wordSpanRef.map(i=>{
      Array.from(i.current.childNodes).map(j=>{
        j.className='char';
      })
    })
    console.log(wordSpanRef);
    wordSpanRef[0].current.childNodes[0].className='char current';
  }  
  
 

  const typingTimer=()=>{
    const intervalId=setInterval(timer,1000);
    setIntervalId(intervalId);
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
        
        const correctChars=wordSpanRef[currentwordIndex].current.querySelectorAll('.correct');
        if(correctChars.length===allChildrenSpans.length){
          setCorrectWords(correctWords+1);
        }


        if(allChildrenSpans.length<=currentCharIndex){
          allChildrenSpans[currentCharIndex-1].classList.remove('right');
        }else{
          allChildrenSpans[currentCharIndex].className=allChildrenSpans[currentCharIndex].className.replace('current','');
        }
        setCurrentwordIndex(currentwordIndex+1);
        setCurrentCharIndex(0);
        return ;
      }
      
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


      if(e.key===allChildrenSpans[currentCharIndex].innerText){
        allChildrenSpans[currentCharIndex].className="char correct";
        setCorrectChars(correctChars+1);
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




const calculateAccuracy=()=>{
    return Math.round((correctWords/currentwordIndex)*100)
}

const calculateWPM=()=>{
  return Math.round((correctChars/5)/(testTime/60));
}
  

const foucusInput=()=>{
  inputTextRef.current.focus();
}
useEffect(() => {
  
  resetTest();


}, [testTime]);


const resetTest=()=>{
  setCurrentCharIndex(0);
  setCurrentwordIndex(0);
  setTestStart(false);
  setTestOver(false);
  clearInterval(intervalId);
  setCountDown(testTime);
  let random=randomwords(100);
  setWordArray(random);
  // resetWordSpanRefClassNames();
  
}




useEffect(()=>{
  foucusInput();
},[]);


  return (
    <div>
   
   {(testOver)? (<Stat WPM={calculateWPM()} accuracy={calculateAccuracy()}/>):
    (<>
     <UpperMenu countDown={countDown}/>
    <div className="type-box" onClick={foucusInput}>
    <div className="words">
       {words.map((word,index)=>(
        <span className='word' key={index} ref={wordSpanRef[index]}>
          {word.split("").map((char,idx)=>(
            <span className='char' key={ `${char+idx}`}>{char}</span>
          ))}
        </span>
       ))}
    </div>
</div></>)

      }
    
   
    <input type="text" className='hidden-input' ref={inputTextRef}
      onKeyDown={((e)=>handleKeyDown(e))}
    />
   </div>
  )
}

export default TypingBox