const socket = io(`http://localhost:3000`, {
  transports: ['websocket'],
});

const messageContainer = document.querySelector('.message-container');
const messageForm = document.querySelector('.chatbox');
const messageInput = document.querySelector('.message-input');

const Username = prompt('Enter your name to enter chat');

socket.emit('new-user', Username);

socket.on('chat-message', (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', (name) => {
  appendMessage(`${name} connected..`);
});

socket.on('user-disconnected', (name) => {
  appendMessage(`${name} disconnected..`);
});

if (!Username) {
  location.reload(true);
} else {
  appendMessage('You joined');
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;

  socket.emit('send-chat-message', message);
  appendMessage(`you: ${message}`);
  messageInput.value = '';

  console.log(appendMessage);
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
