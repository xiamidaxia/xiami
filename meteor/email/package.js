Package.describe({
  summary: "Send email messages",
  meteor: "0.8.1.3"
});

Package.server({
    imports: ["meteor"],
    files: "*",
    test_imports: "test-helpers",
    test_files: "email_tests.js"
})
