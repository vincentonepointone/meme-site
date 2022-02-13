const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload'); 
const Post = require('./filesNameModel');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup');
const cors = require('cors');
const path = require('path');
// require('dotenv').config();
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink)
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_SECRET_KEY_ID;
const secretAccesskey = process.env.AWS_ACCESS_KEY_SECRET;
console.log("here====>",bucketName,region,accessKeyId,secretAccesskey)

const s3 = new S3({
	accessKeyId: process.env.AWS_SECRET_KEY_ID,
	secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
	region:process.env.AWS_BUCKET_REGION,
})

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

app.use(express.static('.well-known'))
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
app.put('/upVote', (req, res) => {
	let id = req.body.id;
	 var ids = mongoose.Types.ObjectId(id);
	 async function updateMydb() {
		 try{
			const post = await Post.updateOne({ _id: ids}, { $inc: { "upvotes" : 1 } }) 
			console.log(post)
		 }catch(e){
			console.log(e.message)
		 }
		      
	}
	updateMydb()
})

app.put('/downVote', (req, res) => {
	let id = req.body.id;
	 var ids = mongoose.Types.ObjectId(id);
	 async function updateMydb() {
		 try{
			const post = await Post.updateOne({ _id: ids}, { $inc: { "downvotes" : -1 } }) 
			console.log(post)
		 }catch(e){
			console.log(e.message)
		 }
		      
	}
	updateMydb()
})

 function bucket(fileName) {
	const filepath = path.join(__dirname,'public','memes', fileName)
	const fileStream = fs.createReadStream(filepath);

	
	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: fileName,
	};

		s3.upload(uploadParams)
		.promise()
		.then((data) =>{
		data.Location	
		 unlinkFile(filepath)
		});
}
app.post('/upload', async (req,res) => {
	var file = req.files.fileInput;
	var caption = req.body.caption;
	var fileName = file.name; 
	var filePath =	'public/memes/'+fileName;
	console.log(filePath)
	await file.mv('public/memes/' + fileName, (err) => {
		if (err) {
			res.send(err);
		} else {
			console.log('fileUploaded')
		}

	});

		bucket(fileName);
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
	  "fileName": 'vids/' + fileName,
	  "ext": ext,
	  "caption": caption,
	  'upvotes': 0,
	  "downvotes": 0
	}
	

	const newPost = new Post(newFile);
	async function updateMydb() {
	const savedPost =   await newPost.save();
	console.log(savedPost)          
	}
	updateMydb()
})
function getFileStream(fileKey) {
console.log(fileKey)
	const params = {
		Key: fileKey,
		Bucket: bucketName
	}
	return s3.getObject(params).createReadStream()
}
app.get('/vids/:key',(req, res) => {
	console.log('pipeworking')
	 const key = req.params.key;
	 const readStream = getFileStream(key);
	 readStream.pipe(res)
})
// Google Auth------------------------------------------------
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());


// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')))

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

// Starting server
app.listen(process.env.PORT || 3000 , console.log(`http://localhost:3000 or http://memeitboyz.herokuapp.com`));
