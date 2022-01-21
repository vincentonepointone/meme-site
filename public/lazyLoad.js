const URL = "/filenames";

var filenameCounter = 0;

let options = {
  root: null,
  rootMargins: "0px",
  threshold: 0.0
};
let observer = new IntersectionObserver(handleIntersect, options);
console.log(document.querySelector("observertarget"))
observer.observe(document.querySelector("observertarget"));

//an initial load of some data
getData();

function handleIntersect(entries) {
  if (entries[0].isIntersecting) {
    console.warn("something is intersecting with the viewport");
    getData();
  }
}
function getData() {
  let feed = document.querySelector(".feed");
  console.log("fetch some JSON data");
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      document.querySelector('observertarget').remove();
      for(let i = 0; i < 5; i++) {
        // var postTemplate 
          let src = `/memes/${data[filenameCounter + i].fileName}`;
          let div = document.createElement('div');
          div.classList.add('container');
          let h6 = document.createElement('h6');
          h6.innerText = 'Funny';
          div.append(h6);
          let h3 = document.createElement('h3');
          h3.innerText = 'This is a cool meme';
          div.appendChild(h3);
          let video = document.createElement('video');
          video.setAttribute('controls', '');
          video.setAttribute('loop', '');
          video.classList.add('rounded')
          video.src = src;
          video.setAttribute('alt', 'a meme');
          video.setAttribute('width', '90%');
          // video.addEventListener('mouseover', play);
          // video.addEventListener('touchstart', playM)
          // video.addEventListener('mouseleave', pause);
          div.appendChild(video);
          feed.appendChild(div)       
          if(i == 1){
          let observertarget = document.createElement('observertarget');
          observertarget.setAttribute('height','10px');
          observertarget.setAttribute('width', '2px');
          feed.appendChild(observertarget);                  
          }
      }
      observer.observe(document.querySelector("observertarget"));
      filenameCounter += 6;
    });
}
