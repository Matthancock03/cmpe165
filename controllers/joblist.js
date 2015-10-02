/**
 * Created by johnfranklin on 10/2/15.
 */
/*
title, description, and terms are strings formatted into arrays by splitting by commas ignoring spaces. location is an address. time and wages are an int and a double.
 */
function Job(title,location,time,wages,description,terms, id){

    this.title = title;
    this.location = location;
    this.time = time;
    this.wages = wages;
    this.description = description;
    this.terms = terms.split(" ").join("").split(",");
    this.id = id;
}
var app = angular.module('myApp',[])

app.controller('joblist', function($scope){
    //Dummy data for now. Populate with actual elements from the database and everything should work swimmingly.
    $scope.jobs = [
        new Job("Flash mob", "380 E Arbor Avenue", 1443814482 + 1800, 10, "Do the hokey pokey", "flashmob,prank",0),
        new Job("Prank", "168 Brahms Avenue", 1443814482 + 7200, 20, "Ring the doorbell and then leave, three times in a row", "awkward,prank",1),
        new Job("Wedding Proposal", "861 Trenton Avenue", 1443814482 + 14400, 40, "Lie on the ground In the form of the letters Marry Me", "awkward,wedding",2),
        new Job("Flash Mob Wedding Proposal", "861 Trenton Avenue", 1443814482 + 14400, 100, "[insert elaborate script here]", "flashmob,wedding",3)
    ];
    console.log($scope.jobs);
});
