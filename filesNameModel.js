const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	fileName: String,
	ext: String,
	caption: String,
	upvotes: Number,
	downvotes: Number
});

module.exports = mongoose.model('Post', PostSchema);