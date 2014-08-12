// Uses the node-aes-gcm NPM module from the dev bundle (because
// binary modules aren't working yet).

Package.describe({
  summary: "Encrypt account secrets stored in the database",
  meteor: "0.8.1.3"
});

Package.server({
    imports: ["ejson"],
    files: "encrypt.js",
    main: "encrypt.js",
    test_files: "encrypt_tests.js"
})

