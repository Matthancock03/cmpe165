(function () {
    var app = angular.module('myApp'
    // , []// this was the problem line
    );//John's comments here. testing

    var reviews = [{
        stars: 1,
        body: "This is the review content.",
        ownerId: "foo@bar.com",
        createdOn: 1397490980837
    }, {
        stars: 1,
        body: "This is the review content.",
        ownerId: "foo@bar.com",
        createdOn: 1397490980837
    }, {
        stars: 1,
        body: "This is the review content.",
        ownerId: "foo@bar.com",
        createdOn: 1397490980837
    }];

    //angular.module('myApp').
    app.
        controller('ReviewController', function (Review, $location) {
        this.review = new Review();
        var loadReviews = function(ownerId){
            Review.get()
        }

        this.reviews = reviews;
        if($location.search()._id != null) {
            loadReviews($location.search()._id)
        }
        this.addReview = function (reviews) {
            this.review.createdOn = Date.now();
            this.reviews.push(this.review);//...?Just push to database.
            this.review.save();
        };
    });
})();

