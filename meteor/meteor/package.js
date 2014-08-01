Package.describe({
    summary: "meteor common",
    meteor: "0.8.1.3"
});
Package.all({
    main_preload: true
})
Package.server({
    files: [
        "index.js",
        "meteor.js",
        "server.js",
        "debug.js",
        "dynamics_nodejs.js",
        "fiber_helpers.js",
        "helpers.js",
        "setimmediate.js",
        "timers.js",
        "url_common.js",
        "url_server.js",
        "errors.js"
    ],
    //tests: "test/**/*.+(js|coffee)"
    test_files: [
        'test/debug_test.coffee',
        'test/dynamics_test.js',
        "test/fiber_helpers_test.js",
        "test/helpers_test.js",
        "test/timers_tests.js",
        "test/url_tests.js"
    ]
/*    tests: [
    ]*/
})

Package.client({
    files: ["client.js","debug.js"]
})

