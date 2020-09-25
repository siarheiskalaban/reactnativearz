import {CONNECTION_TYPES} from './connection.types';

const devicesState = {
  pending: true,
  error: false,
  connected: false,
};

export const devicesReducer = (
  state = devicesState,
  action: any,
): typeof state => {
  switch (action.type) {
    case CONNECTION_TYPES.SEARCH_PENDING:
      return {
        ...state,
        pending: true,
      };

    case CONNECTION_TYPES.SEARCH_DECLINED:
      return {
        ...state,
        pending: false,
        error: true,
      };

    case CONNECTION_TYPES.SEARCH_ACCEPTED:
      return {
        ...state,
        pending: false,
        error: false,
      };

    default:
      return state;
  }
};
