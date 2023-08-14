import React, { useContext, useEffect, useState } from "react"
import { getQuestions } from "../../helpers/fetchQuestions"
import Questions from "./Questions"
import { CategoryContext } from "../../context/CategoryContext"
import { ButtonElement } from "../Button"
import { startSound } from "../Sounds"
import { Container, Header } from "../../styles/game.styles"

interface IStartGameProps {}

/** StartGame components is rendered when navigated to /start-game route
 * it keeps track of a choosen category
 * and takes two states
 *  if ready renders the Questions component
 *  if not - renders a "Ready?" screen with prompt to start game
 */

const StartGame: React.FunctionComponent<IStartGameProps> = (): JSX.Element => {
  const { catCode } = useContext(CategoryContext)
  const [questions, setQuestions] = useState([])
  const [ready, setReady] = useState(false)
  
  /** gets 30 questions and updates the "questions" state,
   * will run when "ready" state changes or user chooses a new category
  */
  useEffect (() => {
    let subscribed = true 
    async function getNewQuestions(code: number) {
      const newQuestions = await getQuestions(catCode)
      setQuestions(newQuestions)
    }
    if (subscribed) {
      getNewQuestions(catCode)
    }
    return () => {
      subscribed = false
    }
  //sets dependecies
  }, [ready, catCode])

  return (
    <Container>
      {ready 
      ? <Questions questions={ questions } setReady= {setReady} setQuestions = { setQuestions } />
      : <>
          <Header>Ready?</Header>
          <ButtonElement text="GO!" actions={()=>{
              setReady(true)
              startSound()
            }} />
        </>}
    </Container>
	)
}

export default StartGame