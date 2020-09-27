import {CONNECTION_TYPES} from './connection.types';

const initialState = {
  connected: false,
  attached: false,
  deviceName: null as string,
  displayName: null as string,
};

const connectionReducer = (
  state = initialState,
  action: any,
): typeof initialState => {
  switch (action.type) {
    case CONNECTION_TYPES.CONNECTED:
      return {
        ...state,
        connected: true,
        displayName: action.displayName,
      };

    case CONNECTION_TYPES.DISCONNECTED:
      return {
        ...state,
        connected: false,
        displayName: null,
      };

    case CONNECTION_TYPES.ATTACHED:
      return {
        ...state,
        deviceName: action.deviceName,
        attached: true,
      };

    case CONNECTION_TYPES.DETACHED: {
      return {
        ...state,
        attached: false,
        deviceName: null,
      };
    }

    default:
      return state;
  }
};

export default connectionReducer;
