Package.describe({
    info: "mocha as meteor tinytest"
})

Package.all({
    imports: ["test-helpers", "meteor"],
    files: ['multiTest.js','index.js']
})