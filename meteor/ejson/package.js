Package.describe({
    summary: "Extended and Extensible JSON library",
    meteor: "0.8.1.3"
});

Package.all({
    files: "**/*",
    "imports": "meteor",
    "test_files": [
        "ejson_test.js",
        "base64_test.js",
        "custom_models_for_tests.js"
    ],
    test_imports: "tinytest",
    main_preload: true
})

