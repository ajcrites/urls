require.config({
    baseUrl: "js",
    paths: {
        jquery: "vendor/jquery/jquery.min",
        knockout: "vendor/knockout.js/knockout"
    },
});
require(['urls'], function (app) {
    app.run();
});
