Package.describe({
    "summary": "a simple connect webserver",
    "version": "0.0.1"
})

Package.server({
    imports: [
        "xiami/config",
        "meteor/meteor",
        "meteor/underscore",
        "meteor/logging"
    ],
    files: [
        "**/*"
    ],
    test_files: ["test/xiami.js"],
    main_preload: true
})

