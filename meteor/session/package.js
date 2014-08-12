Package.describe({
  summary: "Session variable",
  internal: true
});

Package.client({
    imports: ["meteor","reactive-dict","ejson","reload"],
    files: "session.js",
    main: "session.js",
    test_imports: ["deps","mongo-livedata","tinytest"],
    test_files: "session_tests.js"
})

