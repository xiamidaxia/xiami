Package.describe({
    info: "start the server"
})

Package.server({
    imports: ["meteor/standard-app-packages", "xiami/webapp", "xiami/config", "meteor/meteor", "meteor/deps"],
    files: ["index.js","serverRun.js"]
})

Package.client({
    imports: ["meteor/standard-app-packages", "xiami/config","meteor/meteor"],
    files: ["index.js", "clientRun.js"]
})