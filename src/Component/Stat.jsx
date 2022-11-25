import React from 'react'

function Stat({WPM,accuracy}) {
  return (
    <div className="stat-box">
    <div className='left-stat'>
        <div className="title">WPM</div>
        <div className="subtitle">{WPM}</div>
        <div className="title">Accuracy</div>
        <div className="subtitle">{accuracy}%</div>
        <div className="title">Character</div>
        <div className="subtitle">30/2/3/3</div>
    </div>
    <div className="right-stat">

    </div>
    </div>
  )
}

export default Stat