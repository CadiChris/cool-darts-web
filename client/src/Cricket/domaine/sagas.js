import { call, put, takeEvery } from "redux-saga/effects";
import { apiWebSocket } from "../sockets/apiWebSocket.socket";
import { eventChannel } from "redux-saga";
import { roomAdapterApi } from "../adapters/roomAdapter.api";

export function* sendEverythingToSocket({ socket = apiWebSocket } = {}) {
  yield takeEvery("*", function* (a) {
    // TODO: ajouter "if !localOnly"
    if (!a.fromRemote) socket.send(a);
  });
}

export function* dispatchEveryActionReceived({ socket = apiWebSocket } = {}) {
  const socketChannel = yield call(webSocketChannel, socket);
  yield takeEvery(socketChannel, function* (a) {
    yield put({ ...a, fromRemote: true });
  });
}

function webSocketChannel(socket) {
  return eventChannel((emitter) => {
    socket.onmessage((event) => {
      console.log("[Event Channel] WebSocket message received:", event.data);
      emitter(JSON.parse(event.data));
    });
    return () => socket.close();
  });
}

export function* catchUpOnRoomSaga({ roomAdapter = roomAdapterApi } = {}) {
  yield takeEvery("CATCH_UP", function* () {
    const actions = yield call(roomAdapter.getAllRoomActions);
    for (const action of actions) yield put(action);
  });
}
