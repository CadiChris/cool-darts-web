import { call, put, takeEvery } from "redux-saga/effects";
import { apiWebSocket } from "../sockets/apiWebSocket.socket";
import { eventChannel } from "redux-saga";
import { roomAdapterApi } from "../adapters/roomAdapter.api";
import { asLocalOnly, CATCH_UP_ON_ROOM, isLocalOnly } from "./actions";

export function* sendEverythingToSocket({ socket = apiWebSocket } = {}) {
  yield takeEvery("*", function* (a) {
    if (!isLocalOnly(a)) socket.send(a);
  });
}

export function* dispatchEveryActionReceived({ socket = apiWebSocket } = {}) {
  const socketChannel = yield call(webSocketChannel, socket);
  yield takeEvery(socketChannel, function* (a) {
    yield put(asLocalOnly(a));
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
  yield takeEvery(CATCH_UP_ON_ROOM, function* () {
    const actions = yield call(roomAdapter.getAllRoomActions);
    for (const action of actions) yield put(asLocalOnly(action));
  });
}
