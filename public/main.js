//Upload file
let fileInput = document.getElementById('fileInput');
let uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(fileInput.files)
    const endpoint = '/upload';
    const formData = new FormData();

    formData.append('fileInput', fileInput.files[0]);

    fetch(endpoint, {
        method: 'post',
        body: formData
    }).catch(console.err)
})