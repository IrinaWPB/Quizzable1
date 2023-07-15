import React, { useContext, useEffect, useState } from "react"
import { getQuestions } from "../../helpers/fetchQuestions"
import Questions from "./Questions"
import { CategoryContext } from "../../context/CategoryContext"
import { ButtonElement } from "../Button"
import { startSound } from "../Sounds"
import { Container, Header } from "../../styles/game.styles"

interface IStartGameProps {}

const StartGame: React.FunctionComponent<IStartGameProps> = (): JSX.Element => {
 
  const { catCode } = useContext(CategoryContext)
 
  const [questions, setQuestions] = useState([])
  const [ready, setReady] = useState(false)
  

  //get 20 questions and add to state
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