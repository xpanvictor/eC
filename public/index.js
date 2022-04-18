

// Function to mute video
function mute(){
    let video = document.querySelector('video')
    if (video.muted){
        return video.muted = false
    }
    video.muted = true
}

let videoHome = document.querySelector('#video')
let videoHome1 = document.querySelector('#video1')

// Socket.io connection *********

const socket = io('/')
socket.emit('a_peer', 1)


// ****** Socket.io end of the connection[tenuos]

// The section for peer connection******
const peer_me = new SimplePeer()

// *****Peer connection end

// Get user's camera first and wait for another user to connect.
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {facingMode: "user", width: 350, height: 350}
}).then(stream => {
    let video = document.createElement('video')
    video.muted = true
    // Use socket to detect when a user has entered the chat and call
    socket.on('new_peer', id => {
        console.log("I'm now calling user", id)
    })
    
    addVideo(stream, video)
})

function addVideo(stream, video){
    video.srcObject = stream
    video.addEventListener('loadedmetadata', ()=>{
        video.play()
    })
    videoHome.append(video)
}

window.addEventListener('beforeunload', ()=>{
    socket.close()
})
