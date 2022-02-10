let increaseVolume = document.getElementById('increaseVolume');
let decreaseVolume = document.getElementById('decreaseVolume');
let videoControls = document.getElementById('videoControls');
let toggled = "mouseover";
videoControls.addEventListener('click', () => {
    if(toggled === "mouseover") {
        document.querySelectorAll('video').forEach((vid) => {
        vid.parentElement.children[0].style.display = "block"
        vid.removeAttribute('controls')   
        vid.addEventListener('mouseover', play);
        vid.addEventListener('mouseleave', pause);
        toggled = "click";
    })         
    } else if(toggled === "click"){
    document.querySelectorAll('video').forEach((vid) => {

        vid.removeEventListener('mouseover', play);
        vid.removeEventListener('mouseleave', pause);
        toggled = "controls";        

    })     
    } else if(toggled === "controls"){
        document.querySelectorAll('video').forEach((vid) => {
            vid.setAttribute('controls','');  
            vid.parentElement.children[0].style.display = "none"  
        })   
        toggled = "mouseover";  
    }

})

const videoPlayClick = () => {
    document.querySelectorAll('video').forEach((vid) => {
        vid.addEventListener('click',(e) => {
            const playButton = e.target.parentElement.children[0];
            if (e.target.paused) {
                 playButton.style.display = 'none'
                e.target.play()
            } else {
                playButton.style.display = 'block'
                e.target.pause();
            }
        })
    })    
}


function play(e) {
   const playButton = e.target.parentElement.children[0];
    if (e.target.paused) {
       playButton.style.display = 'none'
        e.target.play()
      } else {
        e.target.pause();
        playButton.style.display = 'block'
      }
}
function pause(e){
    e.target.pause()
    e.target.parentElement.children[0].style.display = 'block'
}
function playM() {
    const playButton = e.target.parentElement.children[0];
    if (e.target.paused) {
        e.target.play()
        playButton.style.display = 'none'
      } else {
        e.target.pause();
       playButton.style.display = 'block'
      }
}
// audioObj.volume = 0.75;
let count = 10;
const volumeOptions = [
    0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1
]
increaseVolume.addEventListener('click',() => {
    if(count == 10){
        count = 10
    } else {
        count += 2;     
    }
    document.querySelectorAll('video').forEach((vid) => {
        vid.volume  = volumeOptions[count];
    })  
})

decreaseVolume.addEventListener('click', () => {
    if(count == 0){
        count = 0
    } else {
    count -= 2;     
    }
    document.querySelectorAll('video').forEach((vid) => {
        vid.volume  = volumeOptions[count];
    })     
})
