import React from 'react'

const Questions = ({ result, checkTheUser }) => {



  return (
    <div>
      {result.map((item, index) => {
        const { question, correct_answer, incorrect_answers, isAnswered, isCorrect, isClicked } = item;
        if (incorrect_answers.length === 3) {
          incorrect_answers.push(correct_answer)
          incorrect_answers.sort(() => Math.random() - 0.5)

        }

        return (
          <div>
            <h4>{question}</h4>
            {incorrect_answers.map((incorrectAnswer) => {
              console.log(isClicked)
              console.log(incorrectAnswer)

              return (
                <button disabled={isAnswered} onClick={() => checkTheUser(index, incorrectAnswer)}
                ><span style={isCorrect ? isClicked === incorrectAnswer ? { backgroundColor: 'green', padding: '10px', color: 'white' } : {} : {}} >
                    {incorrectAnswer}
                  </span></button>
              )

            })}

          </div>
        )

      })}
    </div>
  )


}


export default Questions