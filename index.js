const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload'); 
const Post = require('./filesNameModel');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport-setup');
const cors = require('cors');
const path = require('path')

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

// Example protected and unprotected routes
app.get('/', (req, res) => res.send('Example Home page!'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

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
