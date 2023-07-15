import { FadeInDiv } from "../Animation";
import { ButtonElement } from "../Button";
import { Header, ScoreHeader } from "../../styles/game.styles"
import { useContext } from "react";
import { OnlineContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FinalStatus } from "./Questions";

interface IEndGameProps {
  score: number;
  playAgain(): void;
  status?: FinalStatus 
}

/** Renders when time is out or no more questions left */
const EndGame: React.FunctionComponent<IEndGameProps> = ({ score, playAgain, status }): JSX.Element => {
  const { online } = useContext(OnlineContext)
  const navigate = useNavigate()
  return (
	<FadeInDiv>
	  { online 
	  ? <>
	    <Header>{status}</Header>
		<ScoreHeader>Your Score: { score }</ScoreHeader>
	    <ButtonElement actions={() => navigate('/')} text="Play Again" />
		<ButtonElement actions={() => navigate('/')} text="Exit" />
	  </>
	  :<>
		<Header>Game Over</Header>
		<ScoreHeader>Your Score: { score }</ScoreHeader>
		<ButtonElement actions={ playAgain } text="Play Again" /> 
	  </> }
	</FadeInDiv>
  )
}

export default EndGame