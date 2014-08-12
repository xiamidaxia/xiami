Package.describe({
  summary: "Reload the page while preserving application state.",
  meteor: "0.8.1.3"
});

Package.client({
    "imports": ["meteor","logging"],
    "files": "*"
})
