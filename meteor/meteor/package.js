Package.describe({
    summary: "meteor common",
    meteor: "0.8.1.3"
});
Package.all({
    imports: "xiami/config",
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
    test_files: [
        'test/server_environment_test.js',
        "test/helpers_test.js",
        'test/dynamics_test.js',
        "test/fiber_helpers_test.js",
        "test/wrapasync_test.js",
        "test/url_tests.js",
        "test/timers_tests.js",
        'test/debug_test.coffee'
    ]
})

Package.client({
    files: [
        "meteor.js",
        "client.js",
        "index.js",
        "debug.js",
        "dynamics_browser.js",
        "helpers.js",
        "setimmediate.js",
        "timers.js",
        "errors.js",
        "fiber_stubs_client.js",
        "startup_client.js",
        "url_common.js"
    ],
    test_files: [
        "test/client_environment_test.js",
        "test/url_tests.js",
        "test/timers_tests.js",
        "test/debug_test.coffee"
    ]
})

