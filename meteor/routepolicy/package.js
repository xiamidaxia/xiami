Package.describe({
    summary: "route policy declarations",
    meteor: "0.8.1.3"
});

Package.server({
    files: "**/*",
    main: "routepolicy.js",
    test_files: ["routepolicy_tests.js"]
})


