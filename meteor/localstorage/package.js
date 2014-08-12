Package.describe({
  summary: "Simulates local storage on IE 6,7 using userData",
  meteor: "0.8.1.3"
});

Package.client({
    imports: ["meteor","random"],
    files: "localstorage.js",
    main: "localstorage.js",
    test_imports: "tinytest",
    test_files: "localstorage_tests.js"
})

