
let videoHome = document.querySelector('#video')

navigator.mediaDevices.getUserMedia({
    audio: true,
    video: {facingMode: "user", width: 600, height: 600}
}).then((stream) => {
    let video = document.createElement("video")
    video.muted = false
    addVideo(stream, video)
})

function addVideo(stream, video){
    video.srcObject = stream
    video.addEventListener('loadedmetadata', ()=>{
        video.play()
    })
    videoHome.append(video)
}
