import { TakenQuiz, Quiz } from "../types/quiz";
import { AuthorizationPromise } from "../types/form";
import UserApi from "../api";

/** Save Results 
 * Function runs when registered user ends the game
 * First it checks if user already played in this category
 *  - if yes - checks if new score is greater than current
 *   - if yes - updates score for the category
 *   - if not - just ignores the result
 * - if not - checks if the new score is greater than 0
 *   - if yes - adds a new result to quizzes table
 *   - if not - just ignores the result
*/
export const saveResults = async (quiz: TakenQuiz): Promise<AuthorizationPromise> => {
  try {
    //gets all quizzes results for the user
    const quizzes: Quiz[] | [] = await UserApi.getUsersQuizzes(quiz.user_id)
    const playedCategories: string[] = []
    for (let q of quizzes) {
      //creates a list of played categories
      playedCategories.push(q.category)
      //only updates if finds played category and lower score for that category
      if (q.category === quiz.category && q.score < quiz.score) {
        await UserApi.updateScores(q.id, quiz.score)
      } 
    }
    //if category is new for the user and result is greater than 0 saves new quiz
    if (!(playedCategories.includes(quiz.category)) && quiz.score > 0) {
      await UserApi.saveQuiz(quiz.category, quiz.score, quiz.user_id)  
    }
    return { success: true };
  } catch (errors) {
  console.error("update failed", errors);
  return { success: false, errors };
  }
}
