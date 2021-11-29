import { call, put, takeEvery } from "redux-saga/effects";
import { apiWebSocket } from "./sockets/apiWebSocket.socket";
import { eventChannel } from "redux-saga";

export function* sendEverythingToSocket({ socket = apiWebSocket } = {}) {
  yield takeEvery("*", function* (a) {
    if (!a.fromRemote) socket.send(a);
  });
}

export function* dispatchEveryActionReceived({ socket = apiWebSocket } = {}) {
  const socketChannel = yield call(webSocketChannel, socket);
  yield takeEvery(socketChannel, function* (a) {
    yield put({ ...a, fromRemote: true });
  });
}

export function webSocketChannel(socket) {
  return eventChannel((emitter) => {
    socket.onmessage((event) => {
      console.log("[Event Channel] WebSocket message received:", event.data);
      emitter(JSON.parse(event.data));
    });
    return () => socket.close();
  });
}
