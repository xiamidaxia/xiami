// XXX We should revisit how we factor MongoDB support into (1) the
// server-side node.js driver [which you might use independently of
// livedata, after all], (2) minimongo [ditto], and (3) Collection,
// which is the class that glues the two of them to Livedata, but also
// is generally the "public interface for newbies" to Mongo in the
// Meteor universe. We want to allow the components to be used
// independently, but we don't want to overwhelm the user with
// minutiae.

Package.describe({
    summary: "Adaptor for using MongoDB and Minimongo over DDP",
    meteor: "0.8.1.3"
});

Package.all({
    "imports": [
        'meteor','random', 'ejson', 'underscore', 'minimongo', 'logging',
        'livedata', 'deps', "callback-hook", "check"
    ],
    "main_preload": true
})

Package.server({
    "imports": [
        "webapp",
        // Binary Heap data structure is used to optimize oplog observe driver
        // performance.
        "binary-heap"
    ],
    files: ["*"],
    "test_imports": [
        "test-helpers",
        "tinytest"
    ],
    "test_files": [
        "test/collection_tests.js",
        //"test/allow_tests.js",
        "test/mongo_livedata_tests.js",
        "test/observe_changes_tests.js",
        "test/oplog_tests.js",
        "test/doc_fetcher_tests.js"
        ]
})

Package.client({
    "files": [
        "local_collection_driver.js",
        "collection.js",
        "index.js"
    ],
    test_files: [
        "test/mongo_livedata_tests.js" ,
        "test/allow_tests.js",
        "test/collection_tests.js",
        "test/observe_changes_tests.js"
    ]
})

/*Package.on_test(function (api) {
 api.use('mongo-livedata');
 api.use('check');
 api.use(['tinytest', 'underscore', 'test-helpers', 'ejson', 'random',
 'livedata']);
 // XXX test order dependency: the allow_tests "partial allow" test
 // fails if it is run before mongo_livedata_tests.
 api.add_files('mongo_livedata_tests.js', ['client', 'server']);
 api.add_files('allow_tests.js', ['client', 'server']);
 api.add_files('collection_tests.js', ['client', 'server']);
 api.add_files('observe_changes_tests.js', ['client', 'server']);
 api.add_files('oplog_tests.js', 'server');
 api.add_files('doc_fetcher_tests.js', 'server');
 });*/
