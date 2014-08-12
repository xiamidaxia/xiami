if (global.isClient) {
    require("./password_client.js")
} else {
    require("./email_templates.js")
    require("./password_server.js")
}