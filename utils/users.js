const users = []

function userJoin(id, username, room) {
    const user = { id, username, room }
    users.push(user)
    return user
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

// User leaves game
function userLeaves(id) {
    const index = users.findIndex(user => user.id === id)
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Get room users
function getRoomUsers(room) {
    console.log(users.filter(user => user.room === room))
    return users.filter(user => user.room === room)
}

module.exports = {
    userJoin, getCurrentUser, userLeaves, getRoomUsers
}