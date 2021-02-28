import React, { FC } from 'react';
import type { BasePageProps } from '../../types/types';
import { useStore, useDispatch } from '../../store';
import { pushPage, popPage, addAnswer, nextQuestion, showResult, clearQuiz } from '../../actions';
import { pages } from '../../router';
import cn from 'classnames';
import { Page } from '../../components';
import { Headline1, Button, ParagraphText1 } from '@sberdevices/ui';

export const Quiz: FC<BasePageProps> = (props) => {
  const { quiz } = useStore();
  const dispatch = useDispatch();

  if (quiz === null) {
    dispatch(popPage());
    return null;
  }

  const back = () => dispatch(pushPage(pages.EXIT_QUIZ));
  const goHome = () => {
    dispatch(popPage());
    dispatch(clearQuiz());
  };

  const doAnswer = (id: number, answer: boolean) => () => dispatch(addAnswer(id, answer));

  const next = () => {
    if (quiz.currentQuestionId + 1 >= quiz.questions.length) {
      dispatch(showResult());
      return;
    }

    dispatch(nextQuestion());
  };

  let screen = null;
  switch (quiz.screen) {
    case 'question': {
      const question = quiz.questions[quiz.currentQuestionId];

      screen = (
        <div className="Quiz__question">
          <div className="Quiz__content">
            <Headline1 className="Quiz__headline">
              {question.title}
            </Headline1>
            <div className="Quiz__actions">
              <Button view="primary" size="m" onClick={doAnswer(question.id, true)}>Да</Button>
              <Button view="critical" size="m" onClick={doAnswer(question.id, false)}>Нет</Button>
            </div>
          </div>

          <img className="Quiz__image" src={question.image_url} width={337} height="auto" alt="" />
        </div>
      );
      break;
    }

    case 'answer_result': {
      const question = quiz.questions[quiz.currentQuestionId];
      const answer = quiz.answers[quiz.currentQuestionId];
      const isTrue = answer === question.is_yes;
      const lastQuestion = quiz.currentQuestionId + 1 >= quiz.questions.length;

      screen = (
        <div className="Quiz__question">
          <div className="Quiz__content">
            <Headline1 className={cn('Quiz__headline', {
              'Quiz__headline--success': isTrue,
              'Quiz__headline--failure': !isTrue,
            })}>
              {isTrue ? 'Правильно' : 'Неправильно'}
            </Headline1>

            <ParagraphText1 className="Quiz__paragraph">
              {isTrue ? question.yes_comment : question.no_comment}
            </ParagraphText1>

            <div className="Quiz__actions">
              <Button view="secondary" size="m" onClick={next}>
                {lastQuestion ? 'Показать результат' : 'К следующему вопросу'}
              </Button>
            </div>
          </div>

          <img className="Quiz__image" src={question.image_url} width={337} height="auto" alt="" />
        </div>
      );

      break;
    }

    case 'finish':
      const rightCount = quiz.questions.reduce((acc: number, question) => {
        const answer = quiz.answers[question.id];
        return answer === question.is_yes ? acc + 1 : acc;
      }, 0);

      screen = (
        <div className="Quiz__finish">
          <Headline1 className="Quiz__headline">
            Ваш результат {rightCount} из {quiz.questions.length}
          </Headline1>

          <ParagraphText1 className="Quiz__paragraph">
            При повторном запуске квиза, он начнётся сначала
          </ParagraphText1>

          <div className="Quiz__actions  Quiz__actions--centered">
            <Button view="primary" size="m" onClick={goHome}>
              В каталог квизов
            </Button>
          </div>
        </div>
      );
  }

  return (
    <Page {...props} className="Quiz">
      {screen}
      <Button onClick={back}>close</Button>
    </Page>
  );
};
