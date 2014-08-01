Package.describe({
    "summary": "a simple connect webserver",
    "version": "0.0.1"
})

Package.server({
    imports: [
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
    main_preload: true
})

