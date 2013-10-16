define(['jquery', 'knockout'], function ($, ko) {
    return function (name, attr, url, definition) {
        var self = this;
        self.name = name;
        self.attr = attr;
        self.description = ko.observable('');
        self.url = url;
        self.delay = ko.observable();
        self.valid = ko.observable(false);

        self.value = ko.computed(function () {
            var a = document.createElement('a');
            a.setAttribute('href', self.url());
            return a[self.attr];
        });
        self.computeDelay = ko.computed(function () {
            return self.delay() + 'ms';
        });
        self.computeLongDelay = ko.computed(function () {
            if (self.valid()) {
               return (+self.delay() + 200) + 'ms';
            }
            else {
               return self.computeDelay();
            }
        });
        self.canSlideIn = ko.computed(function () {
            return !!self.value();
        });
        self.previousValidity = ko.observable(false);

        self.setDescription = function () {
            self.description(definition + "<br>&bull; " + self.value());
        };

        self.clearDescription = function () {
            setTimeout(function () {
                self.description("");
            // additional fadeOut delay for transitions
            }, self.delay() + 200);
        };
    };
});
