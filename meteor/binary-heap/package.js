Package.describe({
    summary: "Binary Heap datastructure implementation",
    meteor: "0.8.1.3"
});

Package.all({
    imports: ["id-map", "meteor"],
    files: ["max-heap.js", "min-max-heap.js", "index.js"],
    test_imports: "test-helpers",
    test_files: ["binary-heap-tests.js"]
})

