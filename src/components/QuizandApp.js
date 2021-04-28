import React, { useState } from 'react';
import App from '../components/App';
import StartScreen from '../components/Start'

function QuizandApp() {
  const [isStarted, setIsStarted] = useState(false)

  const startButton = () => {
    setIsStarted(true)
  }

  if (isStarted) {
    return (
      <div>
        <App></App>
      </div>
    )
  } else {
    return (
      <div>
        <StartScreen startButton={startButton} ></StartScreen>
      </div>
    )
  }
}


export default QuizandApp