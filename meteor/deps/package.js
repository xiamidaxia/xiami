Package.describe({
    summary: "Dependency mananger to allow reactive callbacks",
    meteor: "0.8.1.3"
})

Package.all({
    imports: "meteor",
    "main": "deps.js",
    "test_files": ["deps_tests.js"]
})
