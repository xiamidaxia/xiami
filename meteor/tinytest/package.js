Package.describe({
    info: "mocha as meteor tinytest"
})

Package.all({
    imports: ["test-helpers", "meteor",'random'],
    files: ['multiTest.js','index.js']
})