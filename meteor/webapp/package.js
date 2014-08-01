Package.describe({
    summary: "a simple connect http server, move to the  xiami/webapp package"
})

Package.server({
    imports: ["xiami/webapp", "meteor"]
})