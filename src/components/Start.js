import React from 'react'


function StartScreen({ startButton }) {

  return (
    <div>
      <h4>welcome to the challenge!</h4>
      <button onClick={startButton}>start the quiz</button>
    </div>
  )
}


export default StartScreen