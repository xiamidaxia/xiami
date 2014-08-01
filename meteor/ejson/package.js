Package.describe({
    summary: "Extended and Extensible JSON library",
    meteor: "0.8.1.3"
});

Package.all({
    files: "**/*",
    "imports": "meteor",
    "test_files": [
        "test/ejson_test.js",
        "test/base64_test.js",
        "test/custom_models_for_tests.js"
    ]
})

