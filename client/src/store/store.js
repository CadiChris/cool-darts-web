import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { cricketReducer } from "../Cricket/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  dispatchEveryActionReceived,
  sendEverythingToSocket,
} from "../Cricket/domaine/sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  cricketReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sendEverythingToSocket);
sagaMiddleware.run(dispatchEveryActionReceived);
