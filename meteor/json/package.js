Package.describe({
  summary: "Provides JSON.stringify and JSON.parse for older browsers"
});

// We need to figure out how to serve this file only to browsers that don't have
// JSON.stringify (eg, IE7 and earlier, and IE8 outside of "standards mode")

Package.client({
    files: "**/*"
})
