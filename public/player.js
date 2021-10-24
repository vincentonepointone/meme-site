let increaseVolume = document.getElementById('increaseVolume');
let decreaseVolume = document.getElementById('decreaseVolume');
let videoControls = document.getElementById('videoControls');
let toggled = false;
videoControls.addEventListener('click', () => {
    if(toggled == false || null || undefined) {
        document.querySelectorAll('video').forEach((vid) => {
        vid.removeAttribute('controls')   
        vid.addEventListener('mouseover', play);
        vid.addEventListener('mouseleave', pause);
        toggled = true;
    })         
    } else {
    document.querySelectorAll('video').forEach((vid) => {
        vid.setAttribute('controls','');
        vid.removeEventListener('mouseover', play);
        vid.removeEventListener('mouseleave', pause);
        toggled = false        

    })     
    }

})


function play(e) {
    if (e.target.paused) {
        e.target.play()
      } else {
        e.target.pause();
      }
}
function pause(e){
    e.target.pause()
}
function playM() {
    if (e.target.paused) {
        e.target.play()
      } else {
        e.target.pause();
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
        count += 1;     
    }
    console.log(volumeOptions[count])
    document.querySelectorAll('video').forEach((vid) => {
        vid.volume  = volumeOptions[count];
    })  
})

decreaseVolume.addEventListener('click', () => {
    if(count == 0){
        count = 0
    } else {
    count -= 1;     
    }
    document.querySelectorAll('video').forEach((vid) => {
        vid.volume  = volumeOptions[count];
    })     
})
