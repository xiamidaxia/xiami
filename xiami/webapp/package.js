Package.describe({
    "summary": "a simple connect webserver",
    "version": "0.0.1"
})

Package.server({
    imports: [
        "xiami/config",
        "meteor/meteor",
        "meteor/underscore",
        "meteor/logging",
        "meteor/routepolicy"
    ],
    files: [
        "index.js",
        "util.js",
        "default_config.js",
        "Xiami.js"
    ],
    test_files: ["test/xiami.js"],
    main_preload: true
})

