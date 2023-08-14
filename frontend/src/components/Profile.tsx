import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { Quiz } from "../types/quiz"
import { ButtonElement } from "./Button"
import { useNavigate } from "react-router-dom"
import UserApi from "../api"
import { ScoreHeader, List, Container, Result, Header } from "../styles/profile.styles"

export interface IProfileProps {}

/** Profile component takes current user(access form context)
 * returns a list of top (max 10) scores in played categories
 */
const Profile: React.FunctionComponent<IProfileProps> = (): JSX.Element => {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [quizzes, setQuizzes] = useState([])
  
  useEffect(() => {
    async function getUsersResults(): Promise<void> {
      let allQuizzes: Quiz[] = await UserApi.getUsersQuizzes(currentUser.id)
      allQuizzes.sort((a,b) => b.score - a.score)
      allQuizzes = allQuizzes.slice(0,10)
      setQuizzes(allQuizzes)
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
        {!quizzes
          ? <h3>No quizes yet</h3>
          : <List>
              {quizzes.map((q: Quiz) => <Result key={q.id}>{q.category} - {q.score}</Result>)}
            </List>}
      </Container>} 
    </>
	)
}

export default Profile