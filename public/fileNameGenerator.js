const path = require('path');
const fs = require('fs');

fs.readdir(
  path.resolve(__dirname, 'memes'),
  (err, files) => {
    if (err) throw err;
    
    for (let file of files) {
      console.log(file);
    }
  }
);

