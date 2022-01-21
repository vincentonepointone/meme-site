const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload'); 

// Create express app
const app = express();

// Database
mongoose.connect('mongodb+srv://vincentonepointone:ytrewq132@cluster0.g3er2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use(express.static('public'))
const db = mongoose.connection;

db.once('open', () => {
	console.log("Connected to MongoDB database...");
});

// Middleware
app.use(bodyParser.json());

app.get('/hello', (req, res) => {
	res.send("Hello, World!");
});

const FilenameRoute = require('./routes/Filenames');

app.use('/filenames', FilenameRoute);

//File Uploads
app.use(fileupload())

app.post('/upload', (req,res) => {
	var file = req.files.fileInput;
	var fileName = file.name; 
	console.log(fileName)
	file.mv('./uploads/'+fileName, (err) => {
		if(err){
			res.send(err)
		} else {
			res.send('file Uploaded')
		}
	})
})
// Starting server
app.listen(3000, console.log("Listening on port 3000"));
