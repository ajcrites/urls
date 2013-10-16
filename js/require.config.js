require.config({
    baseUrl: "js",
    paths: {
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min",
        knockout: "//cdnjs.cloudflare.com/ajax/libs/knockout/2.2.1/knockout-min"
    },
});
require(['urls'], function (app) {
    app.run();
});
