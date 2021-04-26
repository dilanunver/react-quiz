import React, { useState } from 'react'

const Questions = ({ result, checkTheUser }) => {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showQuizDone, setShowQuizDone] = useState(false)

  if (result.length === 0) {
    return (
      <h4>Loading</h4>
    )
  }
  const refreshPage = () => {
    setCurrentQuestion(0)
    setShowQuizDone(false)
    return;
  }

  const nextButton = () => {
    let newQuestion = currentQuestion + 1
    let lastQuestion = result.length - 1

    if (newQuestion > lastQuestion) {
      setShowQuizDone(true)
      return
    }
    return setCurrentQuestion(newQuestion)
  }


  if (showQuizDone) {
    let score = 0;
    result.forEach(r => {
      console.log(r)
      if (r.isCorrect) {
        score++
      }
    })
    let notAnswered = 0;
    result.forEach(n => {
      if (!n.isAnswered) {
        notAnswered++
      }
    })
    let answeredCorrect = [];
    let answeredWrong = []
    result.forEach(a => {
      console.log(a.clickedOption)
      if (a.clickedOption === a.correct_answer) {
        answeredCorrect.push(a.clickedOption)
        answeredCorrect.join(', ')
        console.log(answeredCorrect)
      }
      if (a.clickedOption === null) {
        a.clickedOption = ''
        answeredCorrect.push(a.clickedOption)
      } else {
        answeredWrong.push(a.clickedOption)
      }
    })
    return (
      <div>
        <h4>quiz is done</h4>
        <h5> your score is {score} / {result.length}</h5>
        <h5> your empty result : {notAnswered}</h5>
        <h5>your correct result {answeredCorrect.map((item, index) => {
          console.log(result[index].isCorrect)
          if (result[index].isCorrect) {
            return (
              <div>
                <ul>
                  <li>
                    <h6>question : {index + 1}</h6> {item}
                  </li>
                </ul>
              </div>
            )
          }
        })}</h5>



        <button onClick={refreshPage}>again</button>
      </div>
    )
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