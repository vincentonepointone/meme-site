window.addEventListener('DOMContentLoaded', (event) => {
  const URL = "/filenames";
  const feed = document.querySelector(".feed");


  let options = {
    root: null,
    rootMargins: "0px",
    threshold: 0.0
  };

  // let observer = new IntersectionObserver(handleIntersect, options);
  // observer.observe(document.getElementById('intersectionTarget'));
  // getData()
  // function handleIntersect(entries) {
  //   if(entries[0].isIntersecting){
  //     getData ();
  //   }
  // }

  getData();

  function getData() {
    const myHeaders = new Headers();
    const myRequest = new Request(URL, {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    });

    fetch(myRequest)
    .then(response => response.json())
    .then(data => {
      console.table(data)
          data.forEach(element => {
            const src = element.fileName;
            const ext = element.ext;
            const caption = element.caption || "";
            const id = element._id;
            const upvotes = element.upvotes;
            const downvotes = element.downvotes;
            let template;
            if(ext === '.mp4' || ext === ".webm") {
                template = `
                <h4>${caption}</h4>
                <div class="position-relative">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="70" height="70" class="bi bi-caret-right position-absolute top-50 start-50 translate-middle" id="play-button" viewBox="0 0 16 16">
                      <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                  </svg>
                  <video src="/${src}" alt="a meme" class="rounded" width="100%">
                    <source src="/${src}" type="video/mp4; codecs=&quot;av01.0.00M.08, opus&quot;">
                    <source src="/${src}" type="video/mp4">
                  </video>
                  <div class="d-flex my-2" id="${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-up-square mx-2" viewBox="0 0 16 16" value="no">
                      <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                    </svg>
                    <p id="upTag:${id}">${upvotes}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-down-square mx-2" viewBox="0 0 16 16" value="no">
                      <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
                    </svg>
                    <p id="downTag:${id}">${downvotes}</p>
                  </div>
                </div>
              <div class="spacer"></div>
              `;            
            }else {
                template = `
              <div>
                <h4>${caption}</h4>
                <img src="/${src}" width="100%">
                <div class="d-flex my-2" id="${id}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-up-square mx-2" viewBox="0 0 16 16" value="no">
                    <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                  </svg>
                  <p id="upTag:${id}">${upvotes}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-down-square mx-2" viewBox="0 0 16 16" value="no">
                    <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.5 2.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
                  </svg>
                  <p id="upTag:${id}">${downvotes}</p>
                </div>            
              </div> 
              <div class="spacer"></div>
              `;   
            }
            feed.innerHTML += template;                
          });
    }); 
  };
});