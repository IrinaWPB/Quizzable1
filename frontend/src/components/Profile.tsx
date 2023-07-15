import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Quiz } from "../types/quiz";
import { ButtonElement } from "./Button";
import { useNavigate } from "react-router-dom";
import UserApi from "../api";
import { ScoreHeader, List, Container, Result, Header } from "../styles/profile.styles";

export interface IProfileProps {}

const Profile: React.FunctionComponent<IProfileProps> = (): JSX.Element => {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [quizes, setQuizes] = useState([])
  
  useEffect(() => {
    async function getUsersResults(): Promise<void> {
      let allQuizes: Quiz[] = await UserApi.getUsersQuizes(currentUser.id)
      allQuizes.sort((a,b) => b.score - a.score)
      allQuizes = allQuizes.slice(0,10)
      setQuizes(allQuizes)
    }
    if (currentUser) {
      getUsersResults()
    } else {
      navigate('/login')
    } 
  }, [currentUser])

  /** find top 10 scores */
  
  return (
    <>
      {currentUser &&
      <Container>
        <Header>{currentUser.username}</Header>
        <ButtonElement text="Start New Game" actions={() => navigate('/categories')} />
        <ScoreHeader>Your top scores:</ScoreHeader>
        {!quizes
          ? <h3>No quizes yet</h3>
          : <List>
              {quizes.map((q: Quiz) => <Result key={q.id}>{q.category} - {q.score}</Result>)}
            </List>}
      </Container>} 
    </>
	)
}

export default Profile