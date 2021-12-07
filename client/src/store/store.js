import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  catchUpOnRoomSaga,
  dispatchEveryActionReceived,
  sendEverythingToSocket,
} from "../Cricket/domaine/sagas";
import { cricketReducer } from "../Cricket/domaine/reducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  cricketReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sendEverythingToSocket);
sagaMiddleware.run(dispatchEveryActionReceived);
sagaMiddleware.run(catchUpOnRoomSaga);
