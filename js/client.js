const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const userCountElement = document.getElementById('userCount');
const messageContainer = document.querySelector(".container");
const typingIndicator = document.getElementById('typingIndicator');
let isTyping = false;
var audio = new Audio('ting.mp3');

const showTypingIndicator = (user) => {
    typingIndicator.innerText = `${user} is typing...`;
};

// Function to hide typing indicator
const hideTypingIndicator = () => {
    typingIndicator.innerText = '';
};

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
};


const appendCenterMessage = (message) => {
    const centerMessageElement = document.createElement('div');
    centerMessageElement.classList.add('center-message');
    centerMessageElement.innerText = message;
    messageContainer.append(centerMessageElement);
    audio.play();
};

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value = '';
});

messageInput.addEventListener('input', () => {
    if (!isTyping) {
        isTyping = true;
        socket.emit('typing');
    }
});

// Event listener for stopping typing
messageInput.addEventListener('blur', () => {
    if (isTyping) {
        isTyping = false;
        socket.emit('stop-typing');
    }
});


const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    appendCenterMessage(`${name} joined the chat`);
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    appendCenterMessage(`${name} left the chat`);
});

socket.on('user-count-update', count => {
    userCountElement.innerText = `Users Online: ${count}`;
});

socket.on('user-typing', (user) => {
    showTypingIndicator(user);
});

socket.on('user-stop-typing', () => {
    hideTypingIndicator();
});