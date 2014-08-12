Package.describe({
  summary: "Library for Secure Remote Password (SRP) exchanges",
  meteor: "0.8.1.3"
});

Package.all({
    "imports": ["meteor","random","check"],
    files: "*",
    main: "srp",
    test_imports: "tinytest",
    test_files: "srp_tests.js"
})

