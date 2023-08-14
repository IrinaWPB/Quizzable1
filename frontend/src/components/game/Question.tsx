import { QuestionType } from "../../types/question"
import { FadeInDiv } from "../Animation"
import "./Question.css"
import { hoverSound, scoreSound, failSound }  from "../Sounds"
import { Container, 
         QuestionText, 
         AnswersContainer, 
         Answers, 
         AnswerContainer, 
         Answer } from "../../styles/question.styles"

         
interface IQuestionProps {
  question: QuestionType;
  updateScore(): void;
  nextQuestion(): void
  }

const Question: React.FunctionComponent<IQuestionProps> = ({ question, updateScore, nextQuestion }): JSX.Element => {

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    document.querySelectorAll('button').forEach(button => button.disabled = true)
    if (e.currentTarget.innerText === question.correctAnswer) {
	    e.currentTarget.classList.add('correct') 
	    updateScore()  
      scoreSound()                                                                                                                                                                                                                                                                      
	  } else {
      failSound()
	    e.currentTarget.classList.add('incorrect')
      document.getElementById(`${question.correctAnswer}`).classList.add('correct-not-picked') 
	  }
    setTimeout(() => {
      nextQuestion()
    }, 1000)
  }

  return (
	<FadeInDiv> 
	  <Container>
      <QuestionText dangerouslySetInnerHTML={ {__html: question.question} }></QuestionText> 
      <AnswersContainer>
        <Answers className="ui two column doubling stackable grid">
          {question.answers.map((answer: string, idx: number) => (
            <AnswerContainer className='column'  key={ answer }>
              <Answer onClick={ checkAnswer } id={ answer } disabled={ false } onMouseEnter={ hoverSound } dangerouslySetInnerHTML={ { __html: answer } }/>
            </AnswerContainer>))}
        </Answers>
      </AnswersContainer>
	  </Container>
	</FadeInDiv>
  )
}

export default Question