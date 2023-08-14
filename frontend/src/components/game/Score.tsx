import { FadeInDiv } from "../Animation"
import { ScoreScreen, Container, Header } from "../../styles/statusBar.styles"

interface IScoreProps {
  score: number
}

//Renders current score (takes prop from Questions component)
const Score: React.FunctionComponent<IScoreProps> = ({ score }): JSX.Element => {
  return (
	<Container>
	  <Header>
      Current score: 
      <FadeInDiv>
        <ScoreScreen>
          { score }
        </ScoreScreen>
      </FadeInDiv>
    </Header>
	</Container>
  )
}

export default Score