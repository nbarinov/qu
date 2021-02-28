import { ActionTypes } from '../Reducer';

export function createAction<T = any>(type: ActionTypes, data?: T) {
  if (data === undefined) return { type };

  return {
    type,
    data,
  };
}
