// Require everything in the utils dir
require('fs').readdirSync(__dirname).forEach((file) => {
  exports[file.split('.')[0]] = require('./' + file);
});
