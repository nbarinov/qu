import { ActionTypes } from './Reducer';
import { createAction } from './utils/store';
import type { Quiz, QuizQuestion } from './types/objects/quiz';

/* Router */

export const pushPage = (nextPage: string) => createAction<string>(ActionTypes.ROUTER_PUSH_PAGE, nextPage);
export const popPage = () => createAction(ActionTypes.ROUTER_POP_PAGE);
export const popPageTo = (x: number) => createAction<number>(ActionTypes.ROUTER_POP_PAGE_TO, x);

/* Quizzes */
export const setQuizzes = (data: Quiz[]) => createAction<Quiz[]>(ActionTypes.QUIZZES_SET, data);

/* Quiz */

export const attachQuiz = (quiz: Quiz, questions: QuizQuestion[]) => createAction(ActionTypes.QUIZ_ATTACH, { quiz, questions });
export const clearQuiz = () => createAction(ActionTypes.QUIZ_CLEAR);
export const addAnswer = (id: number, answer: boolean) => createAction(ActionTypes.QUIZ_ADD_ANSWER, { id, answer });
export const nextQuestion = () => createAction(ActionTypes.QUIZ_NEXT_QUESTION);
export const showResult = () => createAction(ActionTypes.QUIZ_SHOW_RESULT);
