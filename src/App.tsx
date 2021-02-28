import React, { FC } from 'react';
import { useStore } from './store';
import { pages } from './router';
import { Home, Quiz, ExitQuiz } from './pages';
import { Header, PageRoot } from './components';
import { darkSber } from '@sberdevices/plasma-tokens/themes';
import { createGlobalStyle } from 'styled-components';

const Theme = createGlobalStyle(darkSber);

export const App: FC = () => {
  const { router } = useStore();

  return (
    <div className="App">
      <Theme />
      <Header
        className="App__header"
        header="Да или Нет"
        caption="Простые квизы на 5 минут" />

      <PageRoot activePage={router.activePage}>
        <Home id={pages.HOME} />
        <Quiz id={pages.QUIZ} />
        <ExitQuiz id={pages.EXIT_QUIZ} />
      </PageRoot>
    </div>
  );
};
