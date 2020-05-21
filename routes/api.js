/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function (app) {
  mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
  const ProjectSchema = new Schema({
    project_name: String,
    project_issues: [mongoose.ObjectId]
  });
  const IssueSchema = new Schema({
    issue_title: String,
    issue_text: String,
    created_by: String,
    assigned_to: String,
    status_text: String,
    created_on: Date,
    updated_on: Date,
    open: Boolean
  });

  const PROJECT = mongoose.model("PROJECT", ProjectSchema);
  const ISSUE = mongoose.model("ISSUE", IssueSchema);

  app.route('/api/issues/:project')

  //I can POST /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.
  //The object saved (and returned) will include all of those fields (blank for optional no input) and also include created_on(date/time), updated_on(date/time), open(boolean, true for open, false for closed), and _id.
  .post(function (req, res){
    var project = req.params.project;
    PROJECT.findOneAndUpdate({project_name: project}, {}, {upsert: true, new: true, setDefaultsOnInsert: true}, (err, projObj) => {
      if(err) {
        console.log(err);
        return res.json({error: "Could not POST issue"});
      } else {
        let assignedTo = "";
        let statusText = "";
        if(req.body.assigned_to != undefined) {
          assignedTo = req.body.assigned_to;
        }
        if(req.body.status_text != undefined) {
          statusText = req.body.status_text;
        }
        let newIssue = new ISSUE({issue_title: req.body.issue_title, issue_text: req.body.issue_text, created_by: req.body.created_by, assigned_to: assignedTo, status_text: statusText, created_on: new Date(), updated_on: new Date(), open: true});
        newIssue.save((err) => {
          if(err) {
            console.log(err);
          }
        });
        projObj.project_issues.push(newIssue._id);
        projObj.save((err) => {
          if(err) {
            console.log(err);
          }
        });
        return res.json(newIssue.toJSON());
      }
    });
  })

  //I can GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.
  //I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). I can pass along as many fields/values as I want.
  .get(function (req, res){
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

  //404 Not Found Middleware
  app.use(function(req, res, next) {
    res.status(404)
      .type('text')
      .send('Not Found');
  });

};
