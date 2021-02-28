import type { BaseResponse } from '../types';
import type { Quiz, QuizQuestion } from '../objects/quiz';

export type QuizzesResponse = BaseResponse<Quiz[]>;

export type QuizQuestionsResponse = BaseResponse<QuizQuestion[]>;
