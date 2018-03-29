var readline = require("readline");
var NodeGit = require("nodegit");
var lineNumber = 0;
var selectedOption;

process.stdin.setEncoding("utf8");
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

//Add additonal argument to clone android repo
function cloneGit(path) {
  var cloneURL = "https://github.com/mixpanel/mixpanel-iphone.git";
  //Replace tmp with path variable
  var localPath = require("path").join(__dirname, "mixpanel-iphone");
  var cloneOptions = {};
  cloneOptions.fetchOpts = {
    callbacks: {
      certificateCheck: function() {
        return 1;
      }
    }
  };

  var cloneRepository = NodeGit.Clone(cloneURL, localPath, cloneOptions);

  var errorAndAttemptOpen = function() {
    return NodeGit.Repository.open(local);
  };

  cloneRepository.catch(errorAndAttemptOpen).then(function(repository) {
    // Access any repository methods here.
    console.log("Repository cloned succesfully!");
    return "finished";
    process.exit();
  });
}

module.exports = {
  cloneiOS: function(folderPath) {
    rl.on("line", readLine);
    console.log("This module will help you with the integration of mixpanel.");
    console.log(
      "Please select one option by typing a number and pressing enter:"
    );
    console.log("1: iOS");
    console.log("2: Android");
    function readLine(line) {
      var confirmation = "";
      if (lineNumber == 0) {
        if (!isNaN(parseInt(line))) {
          selectedOption = parseInt(line);
          if (selectedOption === 1 || selectedOption === 2) {
            lineNumber++;
            console.log(
              "First a Mixpanel repository needs to be cloned. Please provide the path where it should be cloned: "
            );
          } else {
            console.log("Invalid Input. Please chose either 1 or 2:");
          }
        } else {
          console.log("Invalid Input. Please chose either 1 or 2:");
        }
      } else if (lineNumber === 1) {
        var path = line;
        console.log("Please confirm your selection: ");
        if (selectedOption === 1) {
          console.log("iOS application. Path:", path, "y/n?");
        } else {
          console.log("Android application. Path:", path, "y/n?");
        }
        lineNumber++;
      }
      if (lineNumber === 2) {
        confirmation = line;
        if (confirmation === "y") {
          console.log(
            "Cloning the repository. This can take up to 2 minutes, please wait:"
          );
          return cloneGit("temp");
        } else if (confirmation === "n") {
          console.log("Reseting module. Please run npm start again.");
          process.exit();
        }
      }
    }
  }
};
