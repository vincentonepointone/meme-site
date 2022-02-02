const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	fileName: String,
	ext: String,
	caption: String,
});

module.exports = mongoose.model('Post', PostSchema);