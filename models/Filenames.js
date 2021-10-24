const mongoose = require('mongoose');

const FilenameSchema = new mongoose.Schema({
	filename: 'string'
});

module.exports = mongoose.model('posts', FilenameSchema);