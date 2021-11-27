import { takeEvery } from "redux-saga/effects";
import { apiWebSocket } from "./sockets/apiWebSocket.socket";

export function* sendEverythingToSocket({ socket = apiWebSocket } = {}) {
  yield takeEvery("*", function* (a) {
    socket.send(a);
  });
}
