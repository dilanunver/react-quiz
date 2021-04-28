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
    })
    setQuestions(result)
    console.log(questions)
    console.log(result) // burada question ve result aynı değerde olmuş oluyor ? boş array geliyor, eğer öylese aşağıdaki fonksiyon neden çalışıyor. 
  }

  const fetchingForPlayButton = async () => {
    setQuestions([])
    const buttonResponse = await fetch(url);
    const jsonResponseforButton = await buttonResponse.json()

    const resultForButton = jsonResponseforButton.results
    setQuestions(resultForButton)
  }

  useEffect(() => {
    fetchingForPlayButton()
  }, [])

  const checkTheUser = (index, answer) => {
    const whatTheUserAnswered = [...questions]
    const indexAnswered = whatTheUserAnswered[index]

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

  return ( //  questions yerine result yazabilir miydik
    <div>
      <Questions result={questions} checkTheUser={checkTheUser} fetchingForPlayButton={fetchingForPlayButton}></Questions>
    </div>
  );
}

export default App;
