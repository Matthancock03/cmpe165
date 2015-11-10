/**
 * Created by johnfranklin on 11/9/15.
 */

var express = require('express');
var stormpath = require('express-stormpath');
db = require('../database');
var dbmodels = {};
dbmodels.Job = require('../models/job');
dbmodels.Comment = require('../models/comment');
dbmodels.User = require('../models/user');
dbmodels.Application = require('../models/application');
dbmodels.Contract = require('../models/Contract');
dbmodels.Mail = require('../models/mail');

var dbRouter = express.Router();
dbRouter.dbmodels = dbmodels;
var retrieveModel = function(modelName, body)
{
    for(property in dbmodels){//for each model
        if(modelName == property)//if model's name from parameter is the same as the name of the model
            return dbmodels[property];//return the model
    }
    return null // model not found
}


var viewPermissions = function(objOfQuery, ownerId)
{
    objOfQuery.$or = [{viewableIds: {$exists: false}}, {ownerId: ownerId}, {viewableIds: ownerId}];
    return objOfQuery
}

/**
 * adds elements to the object used by a query to establish write permissions.
 * @param objOfQuery
 * @param ownerId
 */
var writePermissions = function(objOfQuery, ownerId)
{
    objOfQuery.ownerId = ownerId;
    //objOfQuery.$or = [{modifiable: {$exists: false}}, {modifiable : true}];
    return objOfQuery;
}
dbRouter.get("/:_model", function(req,res, next){
    console.log("Email: " + req.query);
    console.log(req.params._model);
    var ret_model = retrieveModel(req.params._model);
    if(ret_model == null)
    {
        res.json(201, {error : "Invalid Request"});
        return;
    }
    job = new ret_model(req.body);
    console.log(req.query)
    for(property in req.query){//for each property of the query
        if(req.query[property].charAt(0) == '{') {//primary issue. no need for syntax errors otherwise
            try {

                temp = JSON.parse(req.query[property]);//set it to an object version of the string passed.
                req.query[property] = temp;
            }
            catch (e) {//this property not an object
                console.log(e);
            }
        }
    }
    ret_model.find(viewPermissions(req.query, req.user.email), function(err, element){

        if(err){
            console.log(err);
        };
        console.log(element);
        res.json(element);
    });
});
dbRouter.get("/:_model/:_id", function(req,res, next){
console.log("Id: " + req.params._id);

var ret_model = retrieveModel(req.params._model);
if(ret_model == null)
{
    res.json(201, {error : "Invalid Request"});
    return;
}

ret_model.findOne(viewPermissions({_id : req.params._id},req.user.email), function(err, element){
    if(err){return next(err);};
    //console.log(element);
    res.json(element);
});
});
dbRouter.post("/:_model", function(req,res, next){//Really want to include login req here, but need to handle User creation without being logged in.
    console.log('Post Received.');
    //console.log(req);
    console.log(req.body);
    console.log(req.params._model);
    var ret_model = retrieveModel(req.params._model);
    if(ret_model == null)
    {
        return next({error : "Invalid Request"});
    }
    if(req.body.ownerId == null && req.user != null)//needed to resolve an issue with register
        req.body.ownerId = req.user.email;
    var job = new ret_model(req.body);
    console.log(job);
    job.save(function(err, job){
        if(err){
            console.log(err);
            console.log(job);
            console.log("Job did not save correctly.");
            return next(err)
        };
        res.json(201, job);
    })
});
dbRouter.put("/:_model/:_id",stormpath.loginRequired, function(req,res,next){
    console.log("In Put!")
    var ret_model = retrieveModel(req.params._model);
    console.log(req.user.email);
    if(ret_model == null)
    {
        return next({error : "Invalid Request"});
    }
    ret_model.update(writePermissions({_id : req.params._id},req.user.email), req.body, function(err, numAffected){
        if(err){return next(err)}
        console.log("In Put callback!")
    });

});
dbRouter.put("/:_model/",stormpath.loginRequired, function(req,res, next){
    console.log("In Put!")
    var ret_model = retrieveModel(req.params._model);
    console.log(req.user.email);
    if(ret_model == null)
    {
        return next({error : "Invalid Request"});
    }
    ret_model.update(writePermissions(req.query,req.user.email), req.body, function(err, numAffected){
        if(err){return next(err);}
        console.log("In Put callback!")
    });

});
dbRouter.delete("/:_model/:_id",stormpath.loginRequired, function(req,res,next){

    var ret_model = retrieveModel(req.params._model);
    if(ret_model == null)
    {
        return next({error : "Invalid Request"});
        return;
    }

    ret_model.remove(writePermissions({_id : req.params._id},req.user.email),function(err){
        if(err){return next(err);};
    })
});
module.exports = dbRouter;
