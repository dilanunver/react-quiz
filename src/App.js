import React, { useState, useEffect } from 'react';
import Questions from './Questions'

const url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'

function App() {
  const [questions, setQuestions] = useState([])

  const fetchData = async () => {
    const response = await fetch(url);
    const jsonResponse = await response.json() //then, catch

    const result = jsonResponse.results

    result.forEach(function (item) {
      item.isAnswered = false;
      item.isCorrect = false;
      item.clickedOption = null;
      item.id = new Date().getTime()
    })
    setQuestions(result)

  }
  console.log(questions)
  const checkTheUser = (index, answer) => {
    const whatTheUserAnswered = [...questions]
    const indexAnswered = whatTheUserAnswered[index]
    console.log(index)
    if (indexAnswered.incorrect_answers.includes(answer)) {
      indexAnswered.isAnswered = true;
    }
    if (indexAnswered.correct_answer === answer) {
      indexAnswered.isCorrect = true
    }
    indexAnswered.clickedOption = answer


    setQuestions(whatTheUserAnswered)

  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <Questions result={questions} checkTheUser={checkTheUser}></Questions>
    </div>
  );
}

export default App;
