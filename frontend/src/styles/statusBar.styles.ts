import styled from "styled-components";

interface Props {
  timer: number;
}

export const OnlineContainer = styled.div`
  background-color: rgb(255, 255, 255, 0.1);
  margin: 0 15% 20px 15%;
  border-radius: 15px;
  box-shadow: -2px -2px 10px white;
  padding: 2% 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #7dc9fb;
  
  @media (max-width: 800px) {
    flex-direction: column;
    margin: 0 5% 20px 5%;
  }
`

export const Container = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Header = styled.h1`
  color: #63f8f8;
`
export const TimerScreen = styled.span<Props>`
  color: ${(props) => props.timer > 10 ? 'green' : 'red'};
`
export const ScoreScreen = styled.span`
  color: #04d404;
`
export const StatusBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  color: white;
  margin: 0 10%;
`
export const Username = styled.span`
  color: #63f8f8;
  font-size: 1.8rem;
  margin: 0 10px;
`

export const OnlineScore = styled.span`
  color: #04d404;
  font-size: 2rem;
`
export const VS = styled.span`
  text-shadow: 0 0 5px white;
  font-size: 2.5rem;
  margin: 0 50px;
`
