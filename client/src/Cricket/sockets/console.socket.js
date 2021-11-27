const consoleSocket = {
  send(action) {
    console.log("socket.send " + JSON.stringify(action));
  },
};
