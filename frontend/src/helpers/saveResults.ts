import { TakenQuiz, Quiz } from "../types/quiz";
import { AuthorizationPromise } from "../types/form";
import UserApi from "../api";

export const saveResults = async (quiz: TakenQuiz): Promise<AuthorizationPromise> => {
  console.log('running save results')
  try {
    const quizes: Quiz[] | [] = await UserApi.getUsersQuizes(quiz.user_id)
    const playedCategories: string[] = []
    for (let q of quizes) {
      playedCategories.push(q.category)
      if (q.category === quiz.category && q.score < quiz.score) {
        console.log('updating quiz')
        await UserApi.updateScores(q.id, quiz.score)
      } 
    }
    if (!(playedCategories.includes(quiz.category)) && quiz.score > 0) {
      console.log('saving quiz')
      await UserApi.saveQuiz(quiz.category, quiz.score, quiz.user_id)  
    }
    return { success: true };
  } catch (errors) {
  console.error("update failed", errors);
  return { success: false, errors };
  }
}
