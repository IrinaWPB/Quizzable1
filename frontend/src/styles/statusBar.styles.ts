import styled from "styled-components";

interface Props {
  timer: number;
}

export const OnlineContainer = styled.div`
  background-color: rgb(0, 0, 39, 0.8);
  margin: 0 10% 10px 10%;
  border-radius: 15px;
  box-shadow: -2px -2px 10px white;
  padding: 2% 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #7dc9fb;
  position: relative;
  
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

export const ChatContainer = styled.div`
  position: fixed;
  bottom: 5%;
  right: 5%;
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 15px;
  box-shadow: -2px -2px 10px darkblue;
  width: 375px;
  height: 80vh;
  z-index: 100;
`
export const MessageDiv = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  display: flex;
  width: 340px;
  justify-content: space-evenly;
`
export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.7em;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  text-shadow: -2px -2px 10px lightblue;
`
export const SendButton = styled.button`
  height: 38px;
  border: none;
  border-radius: 10px;
  width: 70px;
  color: white;
  text-shadow: 1px 1px 6px blue;
  background-color: #56a3f5;

  &:hover {
    background-color: #5b9bf5;
    box-shadow: 2px 2px 10px #56a3f5;
    transform: scale(1.1);
  };
`