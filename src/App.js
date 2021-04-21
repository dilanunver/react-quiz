import React, { useState, useEffect } from 'react';
import Questions from './Questions'

const url = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
function App() {
  const [questions, setQuestions] = useState([])

  const fetchData = async () => {
    const response = await fetch(url);
    const jsonResponse = await response.json()

    const result = jsonResponse.results
    result.forEach(function (item) {
      item.isAnswered = false;
      item.isCorrect = false;
      item.isClicked = null;
    })
    setQuestions(result)
  }
  const checkTheUser = (index, answer) => {
    const whatTheUserAnswered = [...questions]
    const indexAnswered = whatTheUserAnswered[index]
    if (indexAnswered.incorrect_answers.includes(answer)) {
      indexAnswered.isAnswered = true;

    }
    if (indexAnswered.correct_answer === answer) {
      indexAnswered.isCorrect = true
    }

    if (answer === indexAnswered.correct_answer) {
      indexAnswered.isClicked = answer
    }
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
