Package.describe({
  summary: "Include a standard set of Meteor packages in your app"
});

Package.all({
    "imports": [
        "meteor","webapp",'logging','deps','livedata','mongo-livedata',
        "check", "random", "ejson"
    ],
    "files": "index.js",
    "main_preload": true
})
