Package.describe({
    info: "start the server"
})

Package.server({
    imports: ["meteor/standard-app-packages", "xiami/webapp", "xiami/config"],
    files: ["index.js","serverRun.js"]
})

Package.client({
    imports: ["meteor/standard-app-packages", "xiami/config"],
    files: ["index.js", "clientRun.js"]
})