/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

module.exports = function (app) {
  console.log("db: " + process.env.DB);
  MongoClient.connect(process.env.DB, function(err, db) {
    if(err) {
      console.log("Mongo connection error: " + err);
    }
    app.route('/api/issues/:project')
  
    //I can GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.
    //I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). I can pass along as many fields/values as I want.
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    //I can POST /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.
    .post(function (req, res){
      var project = req.params.project;
      
    })
    
    //I can PUT /api/issues/{projectname} with a _id and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+_id. This should always update updated_on. If no fields are sent return 'no updated field sent'.
    .put(function (req, res){
      var project = req.params.project;
      
    })
    
    //I can DELETE /api/issues/{projectname} with a _id to completely delete an issue. If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.
    .delete(function (req, res){
      var project = req.params.project;
      
    });
  });
};
