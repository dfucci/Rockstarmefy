var config = module.exports;

config["My tests"] = {
      environment: "browser",        // or "node"
          sources: [
                    "../app.js" // Paths are relative to config file
                     ],
          tests: [
           "*-test.js"
                 ]
}

