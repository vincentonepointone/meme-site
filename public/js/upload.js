//Upload file

let uploadForm = document.getElementById('uploadForm');
let modalWarning = document.getElementById('modalWarning');
let fileInput = document.getElementById('fileInput');
let fileVid = document.getElementById('fileVid');
const spinner = document.querySelector('.spinner-border');
fileImage.style.display = "none";
fileVid.style.display = "none";
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    modalWarning.innerText = "";
    let caption = document.getElementById('caption');
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
    spinner.classList.remove('d-none')
    const endpoint = '/upload';
    const formData = new FormData();

    formData.append('fileInput', fileInput.files[0]);
    formData.append('caption', caption.value);
    
    fetch(endpoint, {
        method: 'post',
        body: formData
    })
    .then(result => {

      spinner.classList.add('d-none')
      modalWarning.innerText = "Success! Your MEME is on here!";
      modalWarning.className = "";
      modalWarning.classList.add('bg-success');
      modalWarning.classList.add('text-light');
      caption.value = "";
      fileInput.vlaue = null;
      fileInput.files[0] = "";
      console.log(result + "this is new on sat day")
      fileVid.style.display = "none";
      fileImage.style.display = "none";
      console.log(fileInput)

    })
    .catch(error => {
        spinner.classList.add('d-none')
      modalWarning.innerText = "Upload Failed";
      modalWarning.className = "";
      modalWarning.classList.add('bg-danger');
      modalWarning.classList.add('text-light');
      caption.value = "";
      fileInput.vlaue = "";
      fileInput.files[0] = "";
    });
    }
})

fileInput.onchange = evt => {
    const [file] = fileInput.files

    if (file) {
        fileImage.src = window.URL.createObjectURL(file)
        if(file.name.includes('.mp4')){
            fileVid.src = window.URL.createObjectURL(file);
            fileVid.style.display = "block";
            fileImage.style.display = "none";
            fileVid.onload = function() {
                window.URL.revokeObjectURL(fileVid.src) // free memory
              }
         } else if(file.name.includes(".jpeg")){
            fileImage.src = window.URL.createObjectURL(file);
            fileImage.style.display = "block";
            fileVid.style.display = "none";
            fileImage.onload = function() {
                window.URL.revokeObjectURL(fileImage.src) // free memory
              }            
         } else if(file.name.includes(".webp")){
            fileImage.src = window.URL.createObjectURL(file)
            fileImage.style.display = "block";
            fileVid.style.display = "none";
            fileImage.onload = function() {
                window.URL.revokeObjectURL(fileImage.src) // free memory
              }
         } else if(file.name.includes(".webm")){
            fileVid.src = window.URL.createObjectURL(file)
            fileVid.style.display = "block";
            fileImage.style.display = "none";
            fileVid.onload = function() {
                window.URL.revokeObjectURL(fileVid.src) // free memory
              }
         }
    }
  }