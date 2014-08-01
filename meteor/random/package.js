Package.describe({
    summary: "Random number generator and utilities",
    meteor: "0.8.1.3"
});

Package.all({
    imports: "meteor",
    "main": "random.js",
    "test_files": ["random_tests.js"]
})

