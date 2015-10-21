/**
 * Created by johnfranklin on 10/16/15.
 */
module.exports = db.model("Contract", {
    jobID: {type: String, required: true},
    TOAgreement: {type: String, required: true},
    creationDate: {type: Date, required: false, default: Date.now()},
    employeeSignatureDate: {type: String, required: false},
    employeeID: {type: String, required: false},//Signatures will just be them hitting I agree in a checkbox. No typing.
    //If we want to have them type it in, we can show the signature just by pulling their first and last name from the user object.
    employerSignatureDate: {type: String, required: false}


    //,terms: {type: Schema.Types.ObjectId, ref: 'Term'}
    //,comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});