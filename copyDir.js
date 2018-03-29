var ncp = require("ncp").ncp;

ncp.limit = 16;

module.exports = {
  copyDirectory: function(source, destination) {
    ncp(source, destination, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log("done!");
    });
  }
};
