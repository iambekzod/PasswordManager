const fs = require('fs');
const PATH = 'helpers/constants/';

  // Properties:
  //   ENCRYPT_KEY,
  //   JWT_SECRET,
  //   MAX_AGE
let constants = {};

fs.readdir(PATH, function(err, filenames) {
  if (err) {
    console.log(err);
    return;
  }

  let promises = [];

  for (let filename of filenames) {
    if (!filename.endsWith('.json')) {
      continue;
    }

    let promise = new Promise(function(resolve, reject) {
      fs.readFile(PATH + filename, 'utf-8', function(err, content) {
        if (err) {
          return reject(err);
        }

        let parsedContent = JSON.parse(content);
        for (let property in parsedContent) {
          if (!parsedContent.hasOwnProperty(property)) {
            continue;
          }

          constants[property] = parsedContent[property];
        }
        resolve(parsedContent);
      });
    });

    promises.push(promise);
  }

  Promise.all(promises).then(function() {
    console.log('Constants: ' + JSON.stringify(constants, null, 2));
  });
});

module.exports = constants;
