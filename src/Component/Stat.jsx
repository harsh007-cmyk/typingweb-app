import React from 'react'
import Graph from './Graph'

function Stat({WPM,accuracy,graphData,correctChars,incorrectChars,extraChars,missedChars}) {
  var timeSet=new Set();

  const newGraph=graphData.filter((i)=>{
    if(!timeSet.has(i[0])){
      timeSet.add(i[0]);
      return i;
    }
  })
  return (
    <div className="stat-box">
    <div className='left-stat'>
        <div className="title">WPM</div>
        <div className="subtitle">{WPM}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}%</div>
        <div className="title">Character</div>
        <div className="subtitle">{correctChars}/{incorrectChars}/{missedChars}/{extraChars}</div>
    </div>
    <div className="right-stats">
        <Graph graphData={newGraph}/>
    </div>
    </div>
  )
}

export default Stat