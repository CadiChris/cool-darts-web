import { takeEvery } from "redux-saga/effects";

export function* sendEverythingToSocket({ socket = consoleSocket } = {}) {
  yield takeEvery("*", function* (a) {
    socket.send(a);
  });
}

const consoleSocket = {
  send(action) {
    console.log("socket.send " + JSON.stringify(action));
  },
};
