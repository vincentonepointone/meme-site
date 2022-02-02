//Upload file

let uploadForm = document.getElementById('uploadForm');
let modalWarning = document.getElementById('modalWarning');
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    modalWarning.innerText = "";
    let caption = document.getElementById('caption');
    let fileInput = document.getElementById('fileInput');
    console.log(fileInput.files[0])
    console.log(caption.Prototype)
    if(!caption.value) {
        modalWarning.innerText = "Please enter a caption.";
        modalWarning.className = "";
        modalWarning.classList.add('bg-warning');
        modalWarning.classList.add('text-light');
      
    }else if(!fileInput.files[0]) {
        modalWarning.innerText = "Please Choose a file.";
        modalWarning.className = "";
        modalWarning.classList.add('bg-warning');
        modalWarning.classList.add('text-light');
       
    } else {
    const endpoint = '/upload';
    const formData = new FormData();

    formData.append('fileInput', fileInput.files[0]);
    formData.append('caption', caption.value);
    fetch(endpoint, {
        method: 'post',
        body: formData
    }).catch(console.err)

    modalWarning.innerText = "Success! Your MEME is on here!";
    modalWarning.className = "";
    modalWarning.classList.add('bg-success');
    modalWarning.classList.add('text-light');
    caption.value = "";
    fileInput.vlaue = "";
    fileInput.files[0] = "";
    getData();
    const myTimeout = setTimeout(myGreeting, 5000);

    function myGreeting() {
        getData();
    }

    }
   
})