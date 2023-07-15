import React, { useContext, useEffect, useState } from "react";
import { getQuestions } from "../../helpers/fetchQuestions";
import Questions from "./Questions";
import { CategoryContext } from "../../context/CategoryContext";
import { Container, Header } from "../../styles/game.styles"
import { clientSocketInstance } from "../../socketio-frontend";
import { ButtonElement } from "../Button";
import { OnlineContainer, OnlineScore, Username, VS } from "../../styles/statusBar.styles";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

interface IStartGameProps {}

const StartGame: React.FunctionComponent<IStartGameProps> = (): JSX.Element => {
  const { currentUser } = useContext(UserContext) 
  const { catCode } = useContext(CategoryContext)
  const [questions, setQuestions] = useState([])
  const [ready, setReady] = useState(false)
  const [opponent, setOpponent] = useState("")
  const [myScore, setMyScore] = useState<number>(0)
  const [opponentScore, setOpponentScore] = useState<number>(0)
  const navigate = useNavigate()

  //sets reday to true which renders "quiestions" component
  const startGame = (data: {opponent: string}) => {
    setOpponent(data.opponent)
    setReady(true)
  }
  
  //handles cancel: goes offline and navigates to homePage
  const handleCancelClick = (event: React.MouseEvent<MouseEvent>): void => {
    clientSocketInstance.emit("go_offline");
    navigate('/')
  }
  
  //updates user's score in "VS" status bar
  const updateMyScore = (data: { score: number }): void => {
    setMyScore(data.score)
  }
  
  //updates opponent's score in "VS" status bar
  const updateOpponentScore = (data: { score: number }): void => {
    setOpponentScore(data.score)
  }

  //gets 30 questions, listens to "category" and "ready" status
  useEffect (() => {
    async function getNewQuestions(code: number) {
      const newQuestions = await getQuestions(catCode)
      setQuestions(newQuestions)
    }
    getNewQuestions(catCode)
  }, [ready, catCode])

  //listens to io server
  useEffect (() => {
    clientSocketInstance.on("start_game", startGame)
    clientSocketInstance.on("new_score", updateMyScore)
    clientSocketInstance.on("opponent_new_score", updateOpponentScore)
    return () => {
      clientSocketInstance.off("start_game", startGame)
      clientSocketInstance.off("new_score", updateMyScore)
      clientSocketInstance.off("opponent_new_score", updateOpponentScore)
    }
  },[])

  return (
    <Container>
      {ready 
      ? <>
          <OnlineContainer>
            <div>
              <Username>{currentUser.username}:</Username>
              <OnlineScore>{myScore}</OnlineScore>  
              <VS>VS</VS>  
              <Username>{opponent}:</Username>
              <OnlineScore>{opponentScore}</OnlineScore>
            </div>
          </OnlineContainer>
          <Questions questions={ questions } 
                     setReady={ setReady } 
                     setQuestions={ setQuestions } 
                     opponentScore={ opponentScore }/>
        </>
      : <>
        <Header>Waiting for other player to join the game</Header>
        <ButtonElement text="Cancel" actions={handleCancelClick} />
      </>}
    </Container>
	)
}

export default StartGame