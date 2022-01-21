const Post = require('./filesNameModel');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

//database
mongoose.connect('mongodb+srv://vincentonepointone:ytrewq132@cluster0.g3er2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
	console.log("Connected to MongoDB database..(memes)");
});

fs.readdir(
  path.resolve(__dirname, 'memes'),
  (err, files) => {
    if (err) throw err;
    
    for (let file of files) {
        const newFile = {
          "fileName": file
        }
      //  let ourjson = JSON.stringify(newFile)
      //   console.log(ourjson)
        const newPost = new Post(newFile);
        async function updateMydb() {
        const savedPost =   await newPost.save();
        console.log(savedPost)          
        }
        updateMydb()

    }
  }
);


	
	

