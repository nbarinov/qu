import React, { FC, Dispatch, useReducer } from 'react';
import type { Quiz, QuizQuestion } from './types/objects/quiz';
import { pages } from './router';

export interface QuizState {
  quiz: Quiz;
  questions: QuizQuestion[];
  screen: 'question' | 'answer_result' | 'finish';
  currentQuestionId: number;
  answers: Record<number, boolean>; // { [questionId]: userAnswer [true | false] }
}

export interface State {
  router: {
    activePage: string;
    history: string[];
  };
  quizzes: Quiz[] | null;
  quiz: QuizState | null;
}

export enum ActionTypes {
  ROUTER_PUSH_PAGE,
  ROUTER_POP_PAGE,
  ROUTER_POP_PAGE_TO,

  QUIZZES_SET,

  QUIZ_ATTACH,
  QUIZ_CLEAR,
  QUIZ_ADD_ANSWER,
  QUIZ_NEXT_QUESTION,
  QUIZ_SHOW_RESULT,
}

interface Action {
  type: ActionTypes;
  data?: any;
}

const initialState: State = {
  router: {
    activePage: pages.HOME,
    history: [],
  },
  quizzes: null,
  quiz: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    /* Router */
    case ActionTypes.ROUTER_PUSH_PAGE:
      return {
        ...state,
        router: {
          activePage: action.data,
          history: state.router.history.concat([state.router.activePage]),
        },
      };

    case ActionTypes.ROUTER_POP_PAGE: {
      if (state.router.history.length === 0) return state;

      const history = [...state.router.history];
      const activePage = history.pop();
      return {
        ...state,
        router: { activePage, history },
      };
    }

    case ActionTypes.ROUTER_POP_PAGE_TO: {
      if (state.router.history.length === 0 || action.data < 1) return state;

      if (state.router.history.length < action.data) {
        const activePage = state.router.history[0];
        return {
          ...state,
          router: { activePage, history: [] },
        };
      }

      let history = [...state.router.history];
      const activePage = history[history.length - action.data];
      history.reverse();
      history = history.slice((action.data as number) + 1);
      history.reverse();

      return {
        ...state,
        router: { activePage, history },
      };
    }

    /* Quizzes */
    case ActionTypes.QUIZZES_SET:
      return { ...state, quizzes: action.data };

    /* Quiz */
    case ActionTypes.QUIZ_ATTACH:
      return {
        ...state,
        quiz: {
          ...action.data,
          screen: 'question',
          currentQuestionId: 0,
          answers: {},
        },
      };

    case ActionTypes.QUIZ_ADD_ANSWER: {
      if (state.quiz === null) return state;

      const nextState = { ...state };
      nextState.quiz.answers[action.data.id] = action.data.answer;
      nextState.quiz.screen = 'answer_result';

      return nextState;
    }

    case ActionTypes.QUIZ_NEXT_QUESTION: {
      if (state.quiz === null) return state;

      const nextState = { ...state };
      nextState.quiz.currentQuestionId = nextState.quiz.currentQuestionId + 1;
      nextState.quiz.screen = 'question';

      return nextState;
    }

    case ActionTypes.QUIZ_SHOW_RESULT: {
      if (state.quiz === null) return state;
      return {
        ...state,
        quiz: {
          ...state.quiz,
          screen: 'finish',
        },
      };
    }

    case ActionTypes.QUIZ_CLEAR:
      return { ...state, quiz: null };

    default:
      return state;
  }
}

export type DispatchFn = Dispatch<Action>;

export const StoreContext = React.createContext<State>(initialState);

export const StoreDispatchContext = React.createContext<DispatchFn>(() => undefined);

export const Reducer: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={state}>
      <StoreDispatchContext.Provider value={dispatch}>
        {children}
      </StoreDispatchContext.Provider>
    </StoreContext.Provider>
  );
};
