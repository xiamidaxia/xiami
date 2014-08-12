Package.describe({
  summary: "Password support for accounts",
  meteor: "0.8.1.3"
});

Package.all({
    imports: ["meteor","accounts-base","deps","random","srp","check",'livedata','mongo-livedata'],
    test_imports: ['tinytest','test-helpers'],
    main_preload: true
})

Package.server({
    imports: ["email"],
    files: [
        "email_templates.js",
        "password_server.js",
        "index.js"
    ],
    test_files: [
        "password_tests_setup.js",
        "password_tests.js",
        "email_tests_setup.js"
    ]
})

Package.client({
    files: [
        "password_client.js",
        "index.js"
    ],
    test_files: [
        "password_tests.js",
        "email_tests.js"
    ]
})


