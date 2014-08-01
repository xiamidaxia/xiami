Package.describe({
  summary: "Retry logic with exponential backoff",
  meteor: "0.8.1.3"
});
Package.all({
    files: "**/*",
    imports: ["random", "meteor"],
    main: "retry.js"
})
