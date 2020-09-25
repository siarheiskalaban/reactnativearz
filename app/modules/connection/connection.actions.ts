import { CONNECTION_TYPES } from "./connection.types";

const m = {
  search: {
    p: () => ({ type: CONNECTION_TYPES.SEARCH_PENDING }),
    d: () => ({ type: CONNECTION_TYPES.SEARCH_DECLINED }),
    a: () => ({ type: CONNECTION_TYPES.SEARCH_ACCEPTED }),
  }
};

function fetchDevices() {
  return (dispatch: any) => {
    dispatch(m.search.p());
  }
}