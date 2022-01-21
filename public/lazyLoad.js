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
          let videoTemplate = `
        
          <div class="container ">
            <h6><img src="" alt="" width="20px">Funny </h6>
            <h3>This is a cool meme</h3>
            <video controls preload="auto" loop="" playsinline src="${src}" alt="a meme" class="rounded" style="width: 281.174px; height: 500px;" >
            <source src="${src}" type="video/mp4; codecs=&quot;av01.0.00M.08, opus&quot;"><!----><!----><source src="${src}" type="video/mp4"><!---->
            </video>
          </div> 
  
          `
         <video preload="auto" poster="https://img-9gag-fun.9cache.com/photo/avAorvM_460swp.webp" loop="" style="width: 281.174px; height: 500px;"><source src="https://img-9gag-fun.9cache.com/photo/avAorvM_460svav1.mp4" type="video/mp4; codecs=&quot;av01.0.00M.08, opus&quot;"><!----><!----><source src="https://img-9gag-fun.9cache.com/photo/avAorvM_460sv.mp4" type="video/mp4"><!----></video>

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
        video.setAttribute('playsinline', '');
          video.classList.add('rounded')
          video.src = src;
          video.type="video/mp4"
          video.setAttribute('alt', 'a meme');
          video.setAttribute('width', '90%');
          // video.addEventListener('mouseover', play);
          // video.addEventListener('touchstart', playM)
          // video.addEventListener('mouseleave', pause);
          div.appendChild(video);
          feed.innerHTML += videoTemplate;       
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
