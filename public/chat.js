// client connection
var socket = io.connect('http://localhost:3000'); // io da script in index.html

// dom query
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var handle = document.getElementById('handle');
var message = document.getElementById('message');
var send = document.getElementById('send');

// events
send.addEventListener('click', () => {
    socket.emit('chat', { 
        message: message.value, 
        handle: handle.value 
    });
});

message.addEventListener('keypress', () => {
    console.log('press');
    socket.emit('typing', handle.value);
})

// listen event
socket.on('chat', data => {
    feedback.innerHTML = ''; 
    output.innerHTML += '<p>' + data.handle + ' : ' + data.message + '</p>';
});

socket.on('typing', data => {
    feedback.innerHTML = '<p><em>' + data + '<em/> is typing a message...</p>';
});
