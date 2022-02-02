const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	fileName: String,
	ext: String,

});

module.exports = mongoose.model('Post', PostSchema);