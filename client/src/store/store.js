import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { useSelector } from "react-redux";
import {
  catchUpOnRoomSaga,
  dispatchEveryActionReceived,
  sendEverythingToSocket,
} from "../Cricket/domaine/sagas";
import { cricketReducer } from "../Cricket/domaine/reducer";
import undoable from "./enhancers/undo/undoable";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({ cricket: undoable(cricketReducer) }),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sendEverythingToSocket);
sagaMiddleware.run(dispatchEveryActionReceived);
sagaMiddleware.run(catchUpOnRoomSaga);

export const useCricket = (selecteur) =>
  useSelector((rootState) => selecteur(rootState.cricket.actuel));
