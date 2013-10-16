define(['jquery', 'knockout', 'UrlPiece', 'ko-custom-bindings/fade-visible', 'ko-custom-bindings/transition-delay'],
function ($, ko, UrlPiece) {
    return function () {
        var self = this;
        self.url = ko.observable();

        self.isValidUrl = ko.computed(function () {
            self.url();
            return document.getElementById('url').checkValidity();
        });

        self.pieces = ko.observableArray([
            new UrlPiece('Scheme', 'protocol', self.url, "Communications protocol is a system of digital rules for message exchange"),
            new UrlPiece('Host', 'hostname', self.url, "Service that runs Internet servers that serve content to the Internet"),
            new UrlPiece('Port', 'port', self.url, "Physical interface between computer and other devices"),
            new UrlPiece('Path', 'pathname', self.url, "Unique location"),
            new UrlPiece('Query', 'search', self.url, "Contains data to be passed to web applications"),
            new UrlPiece('Fragment', 'hash', self.url, "Identifies a portion of the document"),
        ]);

        self.url.subscribe(function (newvalue) {
           var delay = 0,
               valid = self.isValidUrl() && self.url()
               reverse = !valid;
           if (reverse) {
              self.pieces().reverse();
           }
           ko.utils.arrayForEach(self.pieces(), function (piece) {
               piece.previousValidity(piece.valid());
               piece.valid(valid && piece.canSlideIn());
               if (piece.valid() != piece.previousValidity()) {
                   piece.delay(delay);
                   delay += 200;
               }
               if (piece.valid()) {
                   piece.setDescription();
               }
               else {
                   // calculate piece delay and remove on fade out.
                   // otherwise some remaining pieces may cause undesired
                   // vertical space
                   piece.clearDescription();
               }
           });
           //observableArray is mutable
           if (reverse) {
              self.pieces().reverse();
           }
        });
    }
});
