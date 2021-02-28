import React, { FC } from 'react';
import type { BasePageProps } from '../../types/types';
import { useDispatch } from '../../store';
import { popPage, popPageTo, clearQuiz } from '../../actions';
import { Page } from '../../components';
import { Headline1, ParagraphText1, Button } from '@sberdevices/ui';

export const ExitQuiz: FC<BasePageProps> = (props) => {
  const dispatch = useDispatch();
  const back = () => dispatch(popPage());
  const close = () => {
    dispatch(popPageTo(2));
    dispatch(clearQuiz());
  };

  return (
    <Page {...props} className="ExitQuiz">
      <Headline1 className="ExitQuiz__headline">
        Выйти из квиза?
      </Headline1>
      <ParagraphText1 className="ExitQuiz__paragraph">
        При повторном запуске квиза, он начнётся сначала
      </ParagraphText1>
      <div className="ExitQuiz__actions">
        <Button view="secondary" size="m" onClick={back}>Продолжить квиз</Button>
        <Button view="critical" size="m" onClick={close}>Выйти</Button>
      </div>
    </Page>
  );
};
