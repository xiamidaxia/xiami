Package.describe({
  summary: "Reactive dictionary",
  meteor: "0.8.1.3"
});

Package.client({
    imports: ["deps","ejson","meteor"],
    files: "*",
    main: "reactive-dict.js"
    // If we are loading mongo-livedata, let you store ObjectIDs in it.
    //api.use('mongo-livedata', {weak: true});
})
