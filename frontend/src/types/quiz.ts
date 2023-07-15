export type Quiz = {
  id: number;
  category: string;
  score: number;
  user_id: number;
}

export type TakenQuiz = {
  category: string;
  score: number;
  user_id: number;
}