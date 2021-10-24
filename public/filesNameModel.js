const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	fileName: String,

});

module.exports = mongoose.model('Post', PostSchema);