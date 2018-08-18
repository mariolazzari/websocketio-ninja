const express = require("express");
const socket = require("socket.io");

const app = express();
app.use(express.static("public"));

const server = app.listen(3000, () =>
  console.log("Server started at port 3000")
);

// socket.io setup
let io = socket(server);
io.on("connection", socket => {
  // log connection ID
  console.log("Connection ID", socket.id);
  // subscribe chat event
  socket.on("chat", data => io.sockets.emit("chat", data));
  // subscribe type event
  socket.on("typing", data => socket.broadcast.emit("typing", data));
});
