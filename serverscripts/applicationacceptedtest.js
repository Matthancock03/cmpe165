/**
 * Created by johnfranklin on 11/19/15.
 */
var driven = require("../serverscripts/postToMailModel")
driven.loadModels();
testemail = { viewableIds: [ 'johnfranklin42@gmail.com' ],
    signed: true,
    __v: 0,
    ownerId: 'jfk@gmail.com',
    bid: 27,
    jobId: '56466db2da085687635ab333',
    _id: "5646896920a93e14684a3e9f" }
driven.acceptedContractMail(testemail)
