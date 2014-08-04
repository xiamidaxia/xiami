var _url = require('url')
var config = require('xiami/config')
// Strip off the path prefix, if it exists.
module.exports = function(request, response, next) {
    var pathPrefix = config.get('root_url_path_prefix')
    var url = _url.parse(request.url);
    var pathname = url.pathname;
    // check if the path in the url starts with the path prefix (and the part
    // after the path prefix must start with a / if it exists.)
    if (pathPrefix && pathname.substring(0, pathPrefix.length) === pathPrefix &&
        (pathname.length == pathPrefix.length
            || pathname.substring(pathPrefix.length, pathPrefix.length + 1) === "/")) {
        request.url = request.url.substring(pathPrefix.length);
        next();
    } else if (pathname === "/favicon.ico" || pathname === "/robots.txt") {
        next();
    } else if (pathPrefix) {
        response.writeHead(404);
        response.write("Unknown path");
        response.end();
    } else {
        next();
    }
}