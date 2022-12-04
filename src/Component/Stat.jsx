import React,{useEffect} from 'react'
import Graph from './Graph'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {db,auth} from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAlert } from '../Context/AlertContext';
function Stat({WPM,accuracy,graphData,correctChars,incorrectChars,extraChars,missedChars,retest}) {
  var timeSet=new Set();
  const [user]=useAuthState(auth);
  const{setAlert}=useAlert();
  const newGraph=graphData.filter((i)=>{
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  })
  const pushResultsToDB=async()=>{
    const resultRef=db.collection('Results');
    console.log(resultRef,'resultRef');
    const {uid}=auth.currentUser;  
    if(!isNaN(accuracy)){
      await resultRef.add({userId:uid,wpm:WPM,accuracy:accuracy,character:`${correctChars}/${missedChars}/${extraChars}`,timeStamp:new Date()}).then(
        (res)=>{
         setAlert({open:true,type:'success',message:'result saved to database'});
        }
      );
     
    }else{
      setAlert({
        open: true,
        type: 'error',
        message: 'invalid test'
      })
    }
  }
  useEffect(()=>{
    if(user){
      pushResultsToDB();
    }
    else{
      setAlert({
        open: true,
        type: 'warning',
        message: 'login to save results!'
      });
    }
  },[]);
  return (
    <div className="stat-box">
    <div className='left-stat'>
        <div className="stats">
        <div className="title">WPM</div>
        <div className="subtitle">{WPM}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}%</div>
        <div className="title">Character</div>
        <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
        </div>
        <RestartAltIcon onClick={retest} className='reset-button'/>
    </div>
    <div className="right-stats">
        <Graph graphData={newGraph}/>  
    </div>
    </div>
  )
}

export default Stat