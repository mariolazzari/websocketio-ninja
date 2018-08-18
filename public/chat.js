// Client connection
const socket = io.connect("http://localhost:3000"); // io from script in index.html

// DOM elements
const output = document.getElementById("output");
let feedback = document.getElementById("feedback");
let handle = document.getElementById("handle");
let message = document.getElementById("message");
let send = document.getElementById("send");

// Raise chat event
send.addEventListener("click", () => {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
});

// Raise type event
message.addEventListener("keypress", () => {
  console.log("press");
  socket.emit("typing", handle.value);
});

// Subscribe chat event
socket.on("chat", data => {
  feedback.innerHTML = "";
  output.innerHTML += "<p>" + data.handle + " : " + data.message + "</p>";
});

// Subscribe type event
socket.on(
  "typing",
  data =>
    (feedback.innerHTML = "<p><em>" + data + "<em/> is typing a message...</p>")
);
