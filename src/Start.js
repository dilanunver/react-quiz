import React, { useState } from 'react'
import Questions from './Questions'


function StartScreen() {

  const [showStart, setShowStart] = useState(true)

  const startQuiz = () => {
    return (
      <div>
        <Questions></Questions>
      </div>
    )
  }

  return (
    <div>
      <h4>welcome to the challenge!</h4>
      <button onClick={startQuiz}>start the quiz</button>
    </div>
  )
}


export default StartScreen