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
    let answeredWrong = [];
    let answeredEmpty = [];
    result.forEach((a, index) => {
      if (a.clickedOption === a.correct_answer) {
        answeredCorrect.push({ 'item': a.clickedOption, 'index': index + 1 })
        answeredCorrect.join(', ')

      }
      if (a.clickedOption === null) {
        answeredEmpty.push({ 'item': a.clickedOption, 'index': index + 1, 'rightAnswer': a.correct_answer })
      }
      if (a.clickedOption !== a.correct_answer && a.clickedOption !== null) {
        console.log(a.correct_answer)
        answeredWrong.push({ 'item': a.clickedOption, 'index': index + 1, 'rightAnswer': a.correct_answer })
      }
    })
    return (
      <div>
        <h4>quiz is done</h4>
        <h5> your score is {score} / {result.length}</h5>
        <h5> your empty result : {notAnswered}</h5>
        <h5>your correct result {answeredCorrect.map((item) => {
          return (
            <div>
              <ul>
                <li>
                  <h6>question : {item.index}</h6> {item.item}
                </li>
              </ul>
            </div>
          )

        })}</h5>

        <h5>your wrong result {answeredWrong.map((item) => {

          console.log(answeredWrong)
          console.log(item)
          return (
            <div>
              <ul>
                <li>
                  <h6>question : {item.index}</h6> {item.item} / but right answer was: {item.rightAnswer}
                </li>
              </ul>
            </div>
          )

        })}</h5>

        <h5>your empty result {answeredEmpty.map((item) => {

          return (
            <div>
              <ul>
                <li>
                  <h6>question : {item.index}</h6> empty / but right answer was: {item.rightAnswer}
                </li>
              </ul>
            </div>
          )

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