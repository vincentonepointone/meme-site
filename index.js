const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload'); 
const Post = require('./filesNameModel');

// Create express app
const app = express();

// Database
mongoose.connect('mongodb+srv://vincentonepointone:ytrewq132@cluster0.g3er2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// mongoose.connect('mongodb://localhost', {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true
// });

app.use(express.static('public'))
const db = mongoose.connection;

db.once('open', () => {
	console.log("Connected to MongoDB database...");
});

// Middleware
app.use(bodyParser.json());


const FilenameRoute = require('./routes/Filenames');

app.use('/filenames', FilenameRoute);

//File Uploads
app.use(fileupload())

app.post('/upload', (req,res) => {
	var file = req.files.fileInput;
	var caption = req.body.caption;
	var fileName = file.name; 


	file.mv('public/memes/'+fileName, (err) => {
		if(err){
			res.send(err)
		} else {
			res.send('file Uploaded')
		}
	})

	var  ext = "";
	if(fileName.includes('.mp4')){
	   ext = '.mp4'
		
	} else if(fileName.includes('.jpeg')){
	   ext = '.jpeg'
  
	} else if(fileName.includes('.webp')){
	   ext = '.webp'
	   
	} else if(fileName.includes('.webm')){
	   ext = '.webm'
  
	}
	const newFile = {
	  "fileName": fileName,
	  "ext": ext,
	  "caption": caption
	}
	

	const newPost = new Post(newFile);
	async function updateMydb() {
	const savedPost =   await newPost.save();
	console.log(savedPost)          
	}
	updateMydb()
})
// Starting server
app.listen(process.env.PORT || 3000 , console.log("on the port of heroku my broku"));
