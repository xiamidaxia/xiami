Package.describe({
  summary: "A user account system",
  meteor: "0.8.1.3"
})

Package.all({
    imports: [
        "meteor",
        "deps",
        "random",
        "livedata",
        "mongo-livedata"
    ],
    files: ["accounts_common.js","index.js"]
})

Package.server({
    imports: ["check","ejson","callback-hook", "oauth-encryption"],
    files: ["accounts_server.js", "url_server.js"],
    test_imports: ["test-helpers", "tinytest"],
    test_files: ["accounts_tests.js"]
})

Package.client({
    imports: ["localstorage","deps"],
    files: ["url_client.js", "accounts_client.js", "localstorage_token.js"]
})

