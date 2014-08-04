Package.describe({
    "info": "config package"
})

Package.all({
    imports: "meteor/underscore",
    files: "index.js"
})

Package.server({
    files: "server_default_config.js",
    test_files: "test/server.js"
})

Package.client({
    files: "client_default_config.js",
    test_files: "test/client.js"
})
