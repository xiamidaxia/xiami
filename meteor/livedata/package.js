Package.describe({
  summary: "Meteor's latency-compensated distributed data framework",
  meteor: "0.8.1.3"
});

// We use 'faye-websocket' for connections in server-to-server DDP, mostly
// because it's the same library used as a server in sockjs, and it's easiest to
// deal with a single websocket implementation.  (Plus, its maintainer is easy
// to work with on pull requests.)
//Npm.depends({sockjs: "0.3.8", "faye-websocket": "0.7.2"});

Package.all({
    "imports": [
        "meteor","check","random","ejson","underscore","deps",
        "logging","retry", "minimongo"
    ],
    files: ["common/*", "index.js"],
    //test_files: "test/*",
    test_imports: [
        "test-helpers",
        "tinytest"
        //"mongo-livedata",
    ],
    test_files: [
        "test/stub_stream.js",
        "test/random_stream_tests.js",
        "test/livedata_test_service.js",
        "test/livedata_tests.js"
        //"test/livedata_connection_tests.js",
    ],
    main_preload: true
})

Package.server({
    "imports": [
        "webapp",
        //"audit-argument-checks",
        //"autopublish",
        //"facts"
        "callback-hook"
    ],

    files: "server/*",
    //test_files: "test/server/*"
    test_imports: [],
    test_files: [
    ]
})


Package.client({
    "imports": "reload",
    "files": "client/*",
    "test_files": "test/client/*"
})

