const socket = io()
const chatForm = document.getElementById('chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.querySelector('.room-name')
const userList = document.querySelector('.user-list')

socket.on('message', message => {
    outputMessage(message)
    chatMessages.scrollTop = chatMessages.scrollHeight
})

document.getElementById("msg").focus()
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username')
const room = urlParams.get('room')

socket.emit('joinRoom', { username, room})

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room)
    outputUsers(users)
})

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // Get message text
    const msg = e.target.elements.msg.value
    // Emit message to server
    socket.emit('chatMessage', msg)
    e.target.elements.msg.value = ''
})


// Output message to DOM
function outputMessage(message) {
    console.log(message)
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `<p class="meta">${message.username}<span> ${message.time}</span></p><p class="text">${message.text}</p>`
    document.querySelector('.chat-messages').appendChild(div)
}

// Output room info to DOM
function outputRoomName(room) {
    roomName.innerText = room
}

function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `
}