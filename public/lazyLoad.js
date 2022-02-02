const URL = "/filenames";

var filenameCounter = 0;

let options = {
  root: null,
  rootMargins: "0px",
  threshold: 0.0
};
let observer = new IntersectionObserver(handleIntersect, options);
observer.observe(document.querySelector("observertarget"));

//an initial load of some data


function handleIntersect(entries) {
  if (entries[0].isIntersecting) {
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
          let ext = data[filenameCounter + i].ext;
          let caption = data[filenameCounter + i].caption;
          let template;
          console.log(ext)
          if(ext === '.mp4' || ext === ".webm") {
             template = `
            <div>
              <h3>${caption}</h3>
              <video controls src="${src}" alt="a meme" class="rounded" width="100%">
              <source src="${src}" type="video/mp4; codecs=&quot;av01.0.00M.08, opus&quot;">
              <source src="${src}" type="video/mp4">
              </video>
            </div> 
            `;            
          }else {
             template = `
            <div>
              <h3>${caption}</h3>
              <img src="${src}" width="100%">
            </div> 
            `;   
          }

          feed.innerHTML += template;       
          if(i == 1){
          let observertarget = document.createElement('observertarget');
          observertarget.setAttribute('height','10px');
          observertarget.setAttribute('width', '2px');
          feed.appendChild(observertarget);                  
          }
      }
      observer.observe(document.querySelector("observertarget"));
      filenameCounter += 5;
    });
}
