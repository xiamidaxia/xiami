Package.describe({
    summary: "Utility functions for tests",
    meteor: "0.8.1.3"
})

Package.all({
    files: "**/*",
    test_files:[],
    imports: ["deps","meteor","random"]
})
