Package.describe({
    summary: "a simple connect http server, move to the  xiami/webapp package"
})

Package.server({
    "files": "index.js",
    imports: ["xiami/webapp", "meteor"]
})