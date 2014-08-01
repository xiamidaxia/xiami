Package.describe({
  summary: "Check whether a value matches a pattern",
  meteor: "0.8.1.3"
});

Package.all({
    "imports": ['ejson', 'meteor'],
    main: "match.js",
    test_imports: ['test-helpers'],
    test_files: ["match_test.js"]
})

