import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FadeInDiv, SlideLeftDiv, SlideRightDiv } from "./Animation";
import { startSound } from "./Sounds";
import { ButtonElement } from "./Button";
import { HomePageWrapper, Header } from "../styles/homePage.styles";
import OnlineNavbar from "./OnlineNavbar";


interface IHomePageProps {
  setMultiNavShow: (status: boolean) => void
  multiNavShow: boolean
}

const HomePage: React.FunctionComponent<IHomePageProps> = ({ setMultiNavShow, multiNavShow }): JSX.Element => {
  const { currentUser } = useContext(UserContext)
  const navigate = useNavigate()
  const startGame = () => {
    navigate('/start-game')
	startSound()
  }
  return (
    <HomePageWrapper>
	  { multiNavShow &&
	   <OnlineNavbar /> }
	  <FadeInDiv>
		<Header>Quizzable</Header>
		<FadeInDiv>
		  <SlideLeftDiv>
			<ButtonElement text="Start Game" actions={startGame} />	
		  </SlideLeftDiv>
		</FadeInDiv>
		
	  {currentUser 

		? <FadeInDiv>
			<SlideRightDiv>
			  <ButtonElement text="Select Category" actions={() => navigate('/categories')} />	
			</SlideRightDiv>
		    <SlideLeftDiv>
		      <ButtonElement text="Multiplayer Game" actions={() => setMultiNavShow(true)} />	
		    </SlideLeftDiv>
		  </FadeInDiv>
		: <>
			<SlideRightDiv>
			  <ButtonElement text="Multiplayer Game" actions={() => navigate('/login')} />	
			</SlideRightDiv>
			<SlideLeftDiv>
			  <ButtonElement text="Login" actions={() => navigate('/login')} />
			</SlideLeftDiv>
			<SlideRightDiv>
			  <ButtonElement text="Register" actions={() => navigate('/register')} /> 
			</SlideRightDiv>
		 </> }
	  </FadeInDiv>
    </HomePageWrapper>
  )
}

export default HomePage