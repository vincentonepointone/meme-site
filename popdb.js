const Post = require('./filesNameModel');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

//database
mongoose.connect('mongodb://localhost:27017', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
	console.log("Connected to MongoDB database..(memes)");
})
fs.readdir(
  path.resolve(__dirname, 'public', 'memes'),
  (err, files) => {
    if (err) throw err;
  
    for (let file of files) {
      var  ext = "";
        if(file.includes('.mp4')){
           ext = '.mp4'
      
        } else if(file.includes('.jpeg')){
           ext = '.jpeg'
      
        } else if(file.includes('.webp')){
           ext = '.webp'
           
        } else if(file.includes('.webm')){
           ext = '.webm'
      
        }
        const newFile = {
          "fileName": file,
          "ext": ext,
        }
        console.log(newFile)

        const newPost = new Post(newFile);
        async function updateMydb() {
        const savedPost =   await newPost.save();
        console.log(savedPost)          
        }
        updateMydb()

    }
  }
);


	
	

