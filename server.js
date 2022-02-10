const express = require('express')
const path = require('path')

const app = new express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname, '/public')))
app.use(express.static(path.join(__dirname,'/node_modules/peerjs')))

app.use('room', function(req, res){
    res.status(301).redirect('/room')
})


io.on('connection', (client)=>{
    client.on('event', ()=>console.log('hey'))
})

app.use('/room', function(req, res){
    res.sendFile(path.join(__dirname, '/index.html'))
})

let port = 3000
server.listen(port, ()=>{`Server is listening at port ${port}`})