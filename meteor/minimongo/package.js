Package.describe({
    summary: "Meteor's client-side datastore: a port of MongoDB to Javascript",
    meteor: "0.8.1.3"
});

Package.all({
    "imports": [
        "meteor", "ejson","id-map","ordered-dict","deps","random",
        //used for geo-location queries such as $near
        "geojson-utils"
    ],
    "files": [
        "index.js",
        "minimongo.js",
        'wrap_transform.js',
        'helpers.js',
        'selector.js',
        'sort.js',
        'projection.js',
        'modify.js',
        'diff.js',
        'id_map.js',
        'observe.js',
        'objectid.js'
    ],
    test_imports: ["test-helpers"],
    test_files: ["test/minimongo_tests.js", "test/wrap_transform_tests.js"],
    main_preload: true
})

Package.server({
    "files": [
        'selector_projection.js',
        'selector_modifier.js',
        'sorter_projection.js'
    ],
    test_files: ["test/minimongo_server_tests.js"]
})