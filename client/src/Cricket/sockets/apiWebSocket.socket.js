const socket = new WebSocket("ws://localhost:5000/api/web-socket");

export const apiWebSocket = {
  send(action) {
    socket.send(JSON.stringify(action));
  },
};
