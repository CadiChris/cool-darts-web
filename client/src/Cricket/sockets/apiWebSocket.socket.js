const host = import.meta.env.VITE_COOL_DARTS_HOST.replace(/^http/, "ws");
const socket = new WebSocket(`${host}/api/web-socket`);

socket.onmessage = function (event) {
  console.log("WebSocket message received:", event.data);
};

export const apiWebSocket = {
  send(action) {
    socket.send(JSON.stringify(action));
  },
};
