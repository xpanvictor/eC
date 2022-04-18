const express = require('express')
const path = require('path')

// Server creation
const app = new express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// serving dist files to the backend
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname, 'node_modules/simple-peer')))
app.use(express.static('node_modules/socket.io/client-dist'))

// User const management
let user = 0
function newUser(){
    return user++
}

// The routes management. I'll end up with client side rendering.
app.use('/room', function(req, res){
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.use('', function(req, res){
    res.status(301).redirect('/room')
})

// Sockets and its connections management
io.on('connection', (socket)=>{
    socket.on('a_peer', (id)=>{
        socket.broadcast.emit('new_peer', id)
        console.log(`User id: ${id}`)
    })
})

io.on('disconnect', ()=>{
    console.log('Oh no, you have been disconnected!')
})

let port = 3000
server.listen(port, ()=>{`Server is listening at port ${port}`})