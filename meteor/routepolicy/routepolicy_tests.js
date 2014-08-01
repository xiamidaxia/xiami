var RoutePolicy = require('meteor/routepolicy')
var RoutePolicyConstructor = RoutePolicy._constructor

it("routepolicy - declare", function(done) {
    var policy = new RoutePolicyConstructor();

    policy.declare('/sockjs/', 'network');
    policy.declare('/bigphoto.jpg', 'static-online');
    policy.declare('/anotherphoto.png', 'static-online');

    test.equal(policy.classify('/'), null);
    test.equal(policy.classify('/foo'), null);
    test.equal(policy.classify('/sockjs'), null);

    test.equal(policy.classify('/sockjs/'), 'network');
    test.equal(policy.classify('/sockjs/foo'), 'network');

    test.equal(policy.classify('/bigphoto.jpg'), 'static-online');
    test.equal(policy.classify('/bigphoto.jpg.orig'), 'static-online');

    test.deepEqual(policy.urlPrefixesFor('network'), ['/sockjs/']);
    test.deepEqual(
        policy.urlPrefixesFor('static-online'),
        ['/anotherphoto.png', '/bigphoto.jpg']
    );
    done()
});

it("routepolicy - static conflicts", function(done) {
    var manifest = [
        {
            "path": "static/sockjs/socks-are-comfy.jpg",
            "type": "static",
            "where": "client",
            "url": "/sockjs/socks-are-comfy.jpg"
        },
        {
            "path": "static/bigphoto.jpg",
            "type": "static",
            "where": "client",
            "url": "/bigphoto.jpg"
        }
    ];
    var policy = new RoutePolicyConstructor();

    test.equal(
        policy.checkForConflictWithStatic('/sockjs/', 'network', manifest),
        "static resource /sockjs/socks-are-comfy.jpg conflicts with network route /sockjs/"
    );

    test.equal(
        policy.checkForConflictWithStatic('/bigphoto.jpg', 'static-online', manifest),
        null
    );
    done()
});

it("routepolicy - checkUrlPrefix", function(done) {
    var policy = new RoutePolicyConstructor();
    policy.declare('/sockjs/', 'network');

    test.equal(
        policy.checkUrlPrefix('foo/bar', 'network'),
        "a route URL prefix must begin with a slash"
    );

    test.equal(
        policy.checkUrlPrefix('/', 'network'),
        "a route URL prefix cannot be /"
    );

    test.equal(
        policy.checkUrlPrefix('/sockjs/', 'static-online'),
        "the route URL prefix /sockjs/ has already been declared to be of type network"
    );
    done()
});
