import React, { FC, useEffect } from 'react';
import type { BasePageProps } from '../../types/types';
import type { QuizzesResponse, QuizQuestionsResponse } from '../../types/methods/quizzes';
import type { Quiz } from '../../types/objects/quiz';
import { useStore, useDispatch } from '../../store';
import { setQuizzes, attachQuiz, pushPage } from '../../actions';
import { Page, QuizCard } from '../../components';
import { Carousel, CarouselItem } from '@sberdevices/ui';

export const Home: FC<BasePageProps> = (props) => {
  const { quizzes } = useStore();
  const dispatch = useDispatch();

  const goQuiz = (quiz: Quiz) => () => {
    fetch(`https://quiz-sber.herokuapp.com/quizzes/${quiz.id}/questions`)
      .then((response) => response.json())
      .then((response: QuizQuestionsResponse) => {
        dispatch(attachQuiz(
          quiz,
          response.data
        ));
        dispatch(pushPage('quiz'));
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (quizzes === null) {
      fetch('https://quiz-sber.herokuapp.com/quizzes')
        .then((response) => response.json())
        .then((response: QuizzesResponse) => {
          dispatch(setQuizzes(response.data));
        })
        .catch(console.error);
    }
  }, []);

  return (
    <Page {...props} className="Home">
      {quizzes !== null &&
      <Carousel className="Home__carousel" axis="x" index={0} scrollSnapType="mandatory">
        {quizzes.map((quiz) => {
          return (
            <CarouselItem key={quiz.id} scrollSnapAlign="end">
              <QuizCard
                className="Home__quizCard"
                quiz={quiz}
                onClick={goQuiz(quiz)} />
            </CarouselItem>
          );
        })}
      </Carousel>}
    </Page>
  );
};
