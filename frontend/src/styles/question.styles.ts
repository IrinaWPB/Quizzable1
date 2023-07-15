import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 120px;
  @media (max-width: 1200px) {
    margin: 10px;
  }
`
export const QuestionText = styled.h1`
  color: rgb(127, 197, 255);
  font-size: 2.2rem;
`
export const AnswersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`
export const Answers = styled.div`
  display: flex;
  justify-content: center;
`
export const AnswerContainer = styled.div``

export const Answer = styled.button`
  width: 500px;
  height: 50px;
  border-radius: 10px;
  background-color: rgb(127, 197, 255);
  color: white;
  text-shadow: 1px 1px 6px blue;
  box-shadow: -1px -1px 6px white;
  font-weight: 700;
  font-size: 1.2rem;
  border: none;
  @media (max-width: 1360px) {
    width: 400px;
  }
  @media (max-width: 550px) {
    width: 300px;
  }
  &:hover {
	 box-shadow: 1px 1px 3px white;
   transform: scale(1.1);
  }
  cursor: pointer;
`