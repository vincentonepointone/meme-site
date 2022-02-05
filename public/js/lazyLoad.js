const URL = "/filenames";
const feed = document.querySelector(".feed");
let filenameCounter = 0;

let options = {
  root: null,
  rootMargins: "0px",
  threshold: 0.0
};

fetch(URL)
.then(response => response.json())
.then(data => {
  let observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(document.querySelector("observertarget"));
  function handleIntersect(entries) {
    if (entries[0].isIntersecting) {
      if(filenameCounter > 0){document.querySelector('observertarget').remove();} 
      for(let i = 0; i < 11; i++) {
        if(filenameCounter === data.length){ return}  
        let src = `/memes/${data[i].fileName}`;
        let ext = data[i].ext;
        let caption = data[i].caption || "";
        let template;
        if(ext === '.mp4' || ext === ".webm") {
            template = `
          <div>
            <h3>${caption}</h3>
        
            <div class="position-relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="70" height="70" class="bi bi-caret-right position-absolute top-50 start-50 translate-middle" id="play-button" viewBox="0 0 16 16">
                  <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
              </svg>

              <video src="${src}" alt="a meme" class="rounded" width="100%">
                <source src="${src}" type="video/mp4; codecs=&quot;av01.0.00M.08, opus&quot;">
                <source src="${src}" type="video/mp4">
              </video>
            </div>
          </div> 
          <div class="spacer"></div>
          `;            
        }else {
            template = `
          <div>
            <h3>${caption}</h3>
            <img src="${src}" width="100%">
          </div> 
          <div class="spacer"></div>
          `;   
        }

        feed.innerHTML += template;       
        if(i == 5){
        let observertarget = document.createElement('observertarget');
        observertarget.setAttribute('height','10px');
        observertarget.setAttribute('width', '2px');
        feed.appendChild(observertarget);                  
        }
        filenameCounter++;
        videoPlayClick();
      }
      observer.observe(document.querySelector("observertarget"));
    }

  }
});

