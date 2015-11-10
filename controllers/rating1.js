(function () {
    var app = angular.module('myApp', []);

    var reviews = [{
        stars: 1,
        body: "This is the review content.",
        author: "foo@bar.com",
        createdOn: 1397490980837
    }, {
        stars: 1,
        body: "This is the review content.",
        author: "foo@bar.com",
        createdOn: 1397490980837
    }, {
        stars: 1,
        body: "This is the review content.",
        author: "foo@bar.com",
        createdOn: 1397490980837
    }];


    app.controller('ReviewController', function () {
        this.review = {};
        this.reviews = reviews;

        this.addReview = function (reviews) {
            this.review.createdOn = Date.now();
            this.reviews.push(this.review);
            this.review = {};
        };
    });
})();

