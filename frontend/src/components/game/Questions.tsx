import React, { useContext, useState } from "react"
import { QuestionType } from "../../types/question"
import Question from "./Question"
import EndGame from "./EndGame"
import Timer from "./Timer"
import Score from "./Score"
import { TakenQuiz } from "../../types/quiz"
import { saveResults } from "../../helpers/saveResults"
import { OnlineContext, UserContext } from "../../context/UserContext"
import { CategoryContext } from "../../context/CategoryContext"
import { CATEGORIES } from "../../assets/categoriesList"
import { StatusBar } from "../../styles/statusBar.styles"
import { gameOverSound } from "../Sounds"
import { clientSocketInstance } from "../../socketio-frontend";


interface IQuestionsProps {
  questions: QuestionType[]
  setReady: React.Dispatch<React.SetStateAction<boolean>>
  setQuestions: React.Dispatch<React.SetStateAction<QuestionType[]>>
  opponentScore?: number
}

export type FinalStatus = "You Won!!!" | "You Lose!" | "It's a tie"

/** Questions component tracks all the values via Context,
 * defines updateScore, play again, endGame and nextQuestion functions 
 * using those values
 * 
 * Renders <StatusBar> and current question if game is still on(timer runs)
 * Renders <EndGame> if time is out.
 */

const Questions: React.FunctionComponent<IQuestionsProps> = ({questions, setReady, setQuestions, opponentScore }): JSX.Element => {
  const { currentUser } = useContext(UserContext)
  const { online } = useContext(OnlineContext)
  const { catCode } = useContext(CategoryContext)
  const { name } = CATEGORIES.find(category => category.code === catCode)
  const [questionNumber, setQuestionNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [winner, setWinner] = useState<FinalStatus>(null)
  
  const userId = clientSocketInstance.id

  //updates score state
  const updateScore = (): void => {
    setScore(score => score + 1)
    clientSocketInstance.emit('score_update', { newScore: score + 1, userId: userId })
  }

  //update number of question
  const nextQuestion = async () => {
    setQuestionNumber(questionNumber => questionNumber + 1)
  }

  //endGame saves result
  const endGame = async(): Promise<void> => {
    if (online) {
      if (score > opponentScore) {
       setWinner("You Won!!!")
      } else if (score < opponentScore) {
        setWinner("You Lose!")
      } else {
        setWinner("It's a tie")
      }
    }
    gameOverSound()
    if (questionNumber !== questions.length) {
      setQuestionNumber(questions.length)
    }
    if (currentUser) {
      let quiz: TakenQuiz = {
        category: name,
        score: score,
        user_id: currentUser.id
      }
      await saveResults(quiz)
    } 
  }

  // Resets score and starts a new game
  const playAgain = (): void => {
    setScore(0)
    setQuestions([])
    setReady(false) 
    }

  return (
    <>
      {questionNumber < questions.length 
      ? <>
          <StatusBar>
            <Timer endGame = { endGame }/>
            <Score score = { score } />
          </StatusBar>
          <Question 
            question = { questions[questionNumber] } 
            key = { questions[questionNumber].id }
            updateScore = { updateScore }
            nextQuestion = { nextQuestion }/>
        </>
      : <EndGame score = { score } playAgain = { playAgain } status = {winner}/>}
    </>
  )
}
   
export default Questions