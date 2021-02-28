import React, { ComponentType, FC, useContext } from 'react';
import { DispatchFn, State, StoreContext, StoreDispatchContext } from './Reducer';

export function useStore(): State {
  const store = useContext(StoreContext);
  if (store === undefined) {
    throw new Error('useStore must be used within a StoreContext');
  }
  return store;
}

export function useDispatch(): DispatchFn {
  const dispatch = useContext(StoreDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useDispatch must be used within a StoreDispatchContext');
  }
  return dispatch;
}

export interface WithStoreProps {
  store: State;
  dispatch: DispatchFn;
}

export const withStore = <P extends WithStoreProps>(Component: ComponentType<P>) => {
  const WithStore: FC<Omit<P, keyof WithStoreProps>> = (props) => {
    const store = useStore();
    const dispatch = useDispatch();

    return (
      <Component
        {...props as P}
        store={store}
        dispatch={dispatch}
      />
    );
  };

  return WithStore;
};
