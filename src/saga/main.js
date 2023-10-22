import { all, fork } from "redux-saga/effects";
import { watchGetProducts } from "./saga";

const rootSaga = function* () {
  yield all([
    fork(watchGetProducts),
  ]);
};

export default rootSaga;