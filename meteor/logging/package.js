Package.describe({
    summary:"",
    meteor: "0.8.1.3"
})

Package.all({
    files: "**/*",
    "imports": ["ejson", "meteor"],
    "main": "logging.js",
    "test_files": ['logging_test.js']
})

