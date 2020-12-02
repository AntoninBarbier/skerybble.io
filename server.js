const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeaves, getRoomUsers } = require('./utils/users')

const PORT = process.env.PORT || 3000
const host = 'http://localhost'

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

const botname = 'Skerybble Bot'

// Runw when client connects
io.on('connection', socket => {
    // Welcome current user
    
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        socket.emit('message', formatMessage(botname, 'Bienvenue sur Skerybble.io !'))
        socket.broadcast.to(user.room).emit('message', formatMessage(botname, `${user.username} a rejoint la partie`))
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })
    })

    // Broadcast whena user connects
    
    socket.on('disconnect', () => {
        const user = userLeaves(socket.id)
        console.log()
        if(user) {
            io.to(user.room).emit('message', formatMessage(botname, `${user.username} a quitté la partie`))
        }
    })

    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id)
        io.to(user.room).emit('message', formatMessage(user.username, msg))
    })

    socket.on('mouse',
        function (data) {
            // Data comes in as whatever was sent, including objects
            // console.log(`Received: mouse' ${data.x} ${data.y} / color ${data.color.r} ${data.color.g} ${data.color.b}`)
            // Send it to all other clients
            console.log(data)
            socket.broadcast.emit('mouse', data)
        }
    )
})

server.listen(PORT, () => {
    console.log(`Server runnning on ${host}:${PORT}`)
})