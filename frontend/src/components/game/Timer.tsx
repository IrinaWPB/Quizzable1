import React, { useEffect, useState, memo } from "react"
import { GAME_DURATION } from "../../configs.ts"
import { FadeInDiv } from "../Animation.tsx"
import { Container, Header, TimerScreen } from "../../styles/statusBar.styles.ts"
import { themeMusic } from "../Sounds.tsx";

interface ITimerProps {
  endGame(): Promise<void>;
}
//Timer watches time remaining for the game
const Timer: React.FunctionComponent<ITimerProps> =  ({ endGame }): JSX.Element => {
  const [timer, setTimer] = useState(GAME_DURATION)
 
  useEffect(() => {
    themeMusic.play()
    const intervalId = setInterval(() => {
      setTimer((t: number) => t - 1)
    }, 1000)
    return () => {
      clearInterval(intervalId)
      themeMusic.pause()
      themeMusic.currentTime = 0
    }
  }, [])
  
  if (timer === 0) {
    endGame()
  }
  return (
		<Container>
			<Header>
        Time remaining: 
          <FadeInDiv>
            <TimerScreen timer = { timer }>
              {timer}
            </TimerScreen>
          </FadeInDiv>
      </Header>
		</Container> 
  )
}
export default memo(Timer)