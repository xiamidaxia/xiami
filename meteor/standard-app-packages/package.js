Package.describe({
  summary: "Include a standard set of Meteor packages in your app"
});

Package.all({
    "imports": [
        "meteor",'logging','deps','livedata',
        "check", "random", "ejson","mongo-livedata","session","reload"
        ,"accounts-base","accounts-password"
    ],
    "files": "index.js",
    "main_preload": true
})

Package.server({
    "imports": ['webapp']
})
