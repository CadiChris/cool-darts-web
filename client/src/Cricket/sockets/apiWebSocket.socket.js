import { Env } from "../../env/Env";

const host = Env.COOL_DARTS_HOST;
const socket = new WebSocket(`${host}/api/web-socket`);

export const apiWebSocket = {
  send(action) {
    socket.send(JSON.stringify(action));
  },
  onmessage(callback) {
    socket.onmessage = callback;
  },
};
