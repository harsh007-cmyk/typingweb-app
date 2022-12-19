import UpperMenu from './UpperMenu';
import { Dialog, DialogTitle } from '@material-ui/core';
import React,{createRef, useEffect,useMemo,useState} from 'react';
import { useRef } from 'react';
import { useTestMode } from '../Context/TestMode';
import Stat from './Stat';
import { useAlert } from '../Context/AlertContext';
var randomwords=require('random-words');
function TypingBox() {
  const inputTextRef=useRef(null);
  const [currentwordIndex,setCurrentwordIndex]=useState(0);
  const [currentCharIndex,setCurrentCharIndex]=useState(0);
  const [correctChars,setCorrectChars]=useState(0);
  const [correctWords,setCorrectWords]=useState(0);
  const {testTime,testMode,testWords}=useTestMode();
  const [countDown, setCountDown] = useState(()=>{
    if(testMode==='words'){
        return 180;
    }
    else{
        return testTime;
    }
});
  const [testStart, setTestStart] = useState(false);
  const [incorrectChars, setincorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [testOver,setTestOver]=useState(false);
  const[intervalId,setIntervalId]=useState(null);
  const [graphDatas,setGraphData]=useState([]);

  const [openDialog,setOpenDialogue]=useState(false);

  const [wordsArray,setWordArray]=useState(()=>{
    if(testMode==='words'){     
      return randomwords(testWords);
    }
    return randomwords(100);
  })

  const words=useMemo(()=>{
    return wordsArray;
  },[wordsArray])
 

  const wordSpanRef=useMemo(()=>{

    return Array(words.length).fill(0).map(i=>createRef(null));
  },[words]);
  
  const resetWordSpanRefClassNames=()=>{
    wordSpanRef.map(i=>{
      Array.from(i.current.childNodes).map(j=>{
        j.className='char';
      })
    })
    console.log(wordSpanRef);
    wordSpanRef[0].current.childNodes[0].className='char current';
  }  
  
 const handleDialogEvents=(e)=>{
  if(e.keyCode===32){
    e.preventDefault();
    redogame();
    setOpenDialogue(false);
    return;
    
  }
  if(e.keyCode===9||e.keyCode===13){
    e.preventDefault();
    resetTest();
    setOpenDialogue(false);
    return;
  }
  e.preventDefault();
  setOpenDialogue(false);
  typingTimer();
 }
 const redogame=()=>{
  setCurrentCharIndex(0);
  setCurrentwordIndex(0);
  setTestStart(false);
  setTestOver(false);
  clearInterval(intervalId);
  setCountDown(testTime);
  if(testMode==='words'){
    setCountDown(180);
  }
  resetWordSpanRefClassNames();
 }

  const typingTimer=()=>{
    const intervalId=setInterval(timer,1000);
    setIntervalId(intervalId);
    function timer(){
      setCountDown(countDown=>{
        setCorrectChars((correctChars)=>{
          setGraphData((data)=>{
            const startTime=(testMode==='words')?180:testTime;
            return [...data,[startTime-countDown,Math.round((correctChars/5))/(testTime-countDown+1)/60]]
          })
          return correctChars;
        })
        if(countDown===1){
          clearInterval(intervalId);
          setCountDown(0);
          setTestOver(true)
        }else{
          return countDown-1;
        }
      })
    }
  }
  


  const handleKeyDown=(e)=>{
    
    if(e.keyCode==9){
      if(testStart){
        clearInterval(intervalId);
      }
      e.preventDefault();
      setOpenDialogue(true);
      return;
    }
    
      if(!testStart){
        typingTimer();
        setTestStart(true);
      }
      
      let allChildrenSpans=wordSpanRef[currentwordIndex].current.querySelectorAll('span');
    
      console.log()
      if(e.keyCode===32){    
        if(currentwordIndex===wordsArray.length-1){
           clearInterval(intervalId);
           setTestOver(true);
           return;
        }
        const correctChars=wordSpanRef[currentwordIndex].current.querySelectorAll('.correct');
        const incorrectChars=wordSpanRef[currentwordIndex].current.querySelectorAll('.not_correct');
        setMissedChars(missedChars+(allChildrenSpans.length-(correctChars.length+incorrectChars.length)));
        if(correctChars.length===allChildrenSpans.length){
          console.log('fasdfa');
          setCorrectWords(correctWords+1);

        }


        if(allChildrenSpans.length<=currentCharIndex){
          allChildrenSpans[currentCharIndex-1].classList.remove('right');
        }else{
          allChildrenSpans[currentCharIndex].className=allChildrenSpans[currentCharIndex].className.replace('current','');
        }
        wordSpanRef[currentwordIndex+1].current.childNodes[0].className='char current';
        if(currentwordIndex!=0&&wordSpanRef[currentwordIndex+1].current.offsetLeft<wordSpanRef[currentwordIndex].current.offsetLeft){
          wordSpanRef[currentCharIndex].current.scrollIntoView();
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
        setExtraChars(extraChars+1);
        return;
      }


      if(e.key===allChildrenSpans[currentCharIndex].innerText){
        allChildrenSpans[currentCharIndex].className="char correct";
        setCorrectChars(correctChars+1);
      }else{
        allChildrenSpans[currentCharIndex].className="char not_correct";
        setincorrectChars(incorrectChars+1);
      }
      
      if(currentCharIndex+1===allChildrenSpans.length){
        allChildrenSpans[currentCharIndex].className+=' right';
      }else{
      allChildrenSpans[currentCharIndex+1].className='char current';
      }
      setCurrentCharIndex(currentCharIndex+1);
    
  }




const calculateAccuracy=()=>{
  console.log(currentwordIndex,correctWords);
  console.log((correctWords/currentwordIndex)*100);

    let acc=(correctWords/currentwordIndex)*100;
   return Math.round(acc);
}

const calculateWPM=()=>{
  const gdata=(graphDatas[graphDatas.length-1][0]+1)/60;
  return Math.round((correctChars/5)/gdata);
}
  

const foucusInput=()=>{
  inputTextRef.current.focus();
}
useEffect(() => {
  
  resetTest();


}, [testTime,testMode,testWords]);   


const resetTest=()=>{
  setCurrentCharIndex(0);
  setCurrentwordIndex(0);
  setTestStart(false);
  setTestOver(false);
  clearInterval(intervalId);
  setCountDown(testTime);
  if(testMode==='words'){
    let random=randomwords(testWords);
    setWordArray(random);
    setCountDown(180);
  }else{
    let random=randomwords(100);
    setWordArray(random);
  }
  setGraphData([]);
  setCorrectChars(0);
  setincorrectChars(0);
  setMissedChars(0);
  setExtraChars(0);
  resetWordSpanRefClassNames();
  
}




useEffect(()=>{
  foucusInput();
},[]);


  return (
    <div>
   
   {(testOver)? (<Stat WPM={calculateWPM()} accuracy={calculateAccuracy()} graphData={graphDatas} correctChars={correctChars} incorrectChars={incorrectChars} extraChars={extraChars} missedChars={missedChars} retest={resetTest}/>):
    (<>
     <UpperMenu countDown={countDown} currentwordIndex={currentwordIndex}/>
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
    <Dialog PaperProps={{
      style:{
        backgroundColor:'transparent',boxShadow:'none'
      }
    }}
    open={openDialog}
    onKeyDown={handleDialogEvents}
    style={{backdropFilter:'blur(2px)'}}
    >
        <DialogTitle>
      <div className="instruction">
        press Space to redo
      </div>
      <div className="instruction">
        Press Tab/Enter to restart
      </div>
      <div className="instruction">
        Press any other key to exit
      </div>
    </DialogTitle>
    </Dialog>
    
   </div>
  )
}

export default TypingBox