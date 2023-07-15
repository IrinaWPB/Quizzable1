import axios from 'axios'
import { QUIZ_API_KEY } from '../configs'
import { QuestionType } from '../types/question'

//Get data from QiuzApp for category "Programming"
async function getTechQuestions() {
	
  let questions: QuestionType[] = []
	const result = await axios.get(`https://quizapi.io/api/v1/questions?apiKey=${QUIZ_API_KEY}&limit=40`)
    console.log(result)
	for (let q of result.data) {
    const id: number = q.id
		const question: string = q.question
		let answers: string[] = []
		for (let a in q.answers) {
			if (q.answers[a] !== null) {
				answers.push(q.answers[a])
			}
		}
		
		let correctAnswer: string;
		for (let a in q.correct_answers) {
			console.log(a, q.correct_answers[a], q.answers[a])
		 	if (q.correct_answers[a] === 'true') {
				a = a.slice(0, 8)
				console.log('a', a, 'correct answer', q.answers[a])
		 		correctAnswer = q.answers[a]
		  }
		}
		let newQuestion: QuestionType = {id, question, answers, correctAnswer}
	    questions.push(newQuestion)
	}
	return questions
}

//Gets trivia Questions for the rest of categories
async function getTriviaQuestions(code: number) {
	let questions: QuestionType[] = []
	let questionId: number = 1
	const result = await axios.get(`https://opentdb.com/api.php?amount=30&category=${code}&type=multiple`)
	for (let q of result.data.results) {
		const id: number = questionId
		const question: string = q.question
		const correctAnswer: string = q.correct_answer

		//add correct answer to the array of incorrect answers at random index
		let index = Math.floor(Math.random() * 4)
	    q.incorrect_answers.splice(index, 0, correctAnswer)
		const answers = q.incorrect_answers

		let newQuestion: QuestionType = {id, question, answers, correctAnswer}
		questions.push(newQuestion)
		questionId ++
	}
  return questions
}


export async function getQuestions(code: number) {
	let result: QuestionType[]
	if (code === 1) {
		result = await getTechQuestions()
	} else {
		result = await getTriviaQuestions(code)
	}
	return result
}