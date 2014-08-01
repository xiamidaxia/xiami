Package.describe({
  summary: "Register callbacks on a hook",
  meteor: "0.8.1.3"
});

Package.server({
    imports: "meteor",
    files: "hook.js",
    main: "hook.js"
})

