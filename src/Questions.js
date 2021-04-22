import React, { useState } from 'react'

const Questions = ({ result, checkTheUser }) => {

  const [currentQuestion, setCurrentQuestion] = useState(0)


  if (result.length === 0) {
    return (
      <h4>Loading</h4>
    )
  }
  const nextButton = () => {
    let newQuestion = currentQuestion + 1
    let lastQuestion = result.length - 1
    console.log(newQuestion)
    console.log(lastQuestion)
    if (newQuestion > lastQuestion) {
      return setCurrentQuestion(0)
    }
    return setCurrentQuestion(newQuestion)


  }

  if (result[currentQuestion].incorrect_answers.length === 3) {
    result[currentQuestion].incorrect_answers.push(result[currentQuestion].correct_answer)
    result[currentQuestion].incorrect_answers.sort(() => Math.random() - 0.5)
  }
  return (
    <div>
      <h5>question {currentQuestion + 1}</h5>
      <h4>{result[currentQuestion].question}</h4>
      {result[currentQuestion].incorrect_answers.map((option) => {
        let buttonStyle = {};
        if (result[currentQuestion].isAnswered && result[currentQuestion].clickedOption === option) {
          if (result[currentQuestion].isCorrect) {
            buttonStyle = { backgroundColor: 'green', padding: '10px', color: 'white' }
          } else {
            buttonStyle = { backgroundColor: 'red', padding: '10px', color: 'white' }
          }
        }
        return (

          <div>
            <button disabled={result[currentQuestion].isAnswered}
              style={buttonStyle}
              onClick={() => checkTheUser(currentQuestion, option)}
            ><span>
                {option}
              </span>

            </button>
          </div>
        )
      })}

      <button onClick={nextButton}>
        next
      </button>
    </div >

  )

}





export default Questions