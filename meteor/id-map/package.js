Package.describe({
    summary: "Dictionary data structure allowing non-string keys",
    meteor: "0.8.1.3"
});

Package.all({
    "imports": ['ejson'],
    "main": "id-map.js"
})

