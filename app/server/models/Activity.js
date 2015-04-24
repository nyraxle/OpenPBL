/*global module, require*/
(function () {
  'use strict';

  // Modules in use
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var Q = require('q');
  var Exception = require('../shared/Exceptions');

  var ActivitySchema = new Schema({
    _creator: { type: String, ref: 'User' },
    name: { type: String, required: true},
    story: String,
    status: {type: Number, min: 1, max: 7, default: 1},
    created: {type: Date, default: Date.now},
    participants: [{ type: String, ref: 'User'}]
  });

  /**
    Save an new instance activity model instance on database
    The received data needs to be on format:
      {
        creatorId: String         =>   Represents the creator Id
        name: String              =>   Represents the name of Activity
        participants: String []   =>   Represents the participants of activity
      }
  **/
  ActivitySchema.statics.saveNewActivity = function (activityData) {
    var deferred = Q.defer();

    var newActivity = new this({
      _creator: activityData.creatorId,
      name: activityData.name,
      participants: activityData.participants
    });

    newActivity.save(function (err, activity) {
      if (err) {
        deferred.reject(Exception.ERROR_CREATING_NEW_ACTIVITY);
      }
      deferred.resolve(activity);
    });

    return deferred.promise;
  };

  /**
    Find all activities by comparisson between an passed column and an condition
      whereColumn      =>  column to compare on where condition
      where Condition  =>  a single value (equals condition) or a list (In condition)
      Query Configuration need to be like the object below:
      i.e:
      {
        select: ['name _id _creator participants'],
        where: ['created', 'name'],
        conditions: ['Date.now()]', ['blue','yello','time']],
        join: [
                {
                  path: 'participants',
                  select: '-_id name '
                }
                {
                  path: '_creator',
                  select: '-_id name '
                }
              ]
      }

      the query result will select name and _id from all instances 
      where created date is equals Date.now and name is in ['blue','yello','time'], 
      the result will be populated with all the participants and the creator
      without id, exclude the id from selected participants.
  **/
  ActivitySchema.statics.findAllActivities = function (queryAttr) {
    var deferred = Q.defer();

    var query = this.find();

    if (!!queryAttr.select) { query.select(queryAttr.select); }

    if (!!queryAttr.where.length) {
      queryAttr.where.forEach(function (column, index){
        query.where(column).equals(queryAttr.conditions[index]);
      });
    }

    if (!!queryAttr.join.length) {
      queryAttr.join.forEach(function (documentAttr) {
        query.populate(documentAttr);
      })
    }

    query.exec(function (err, activities) {
      if(err) { deferred.reject(Exception.ACTIVITY_LIST_FIND_ERROR); }
      deferred.resolve(activities);      
    });

    return deferred.promise;
  };

  module.exports = mongoose.model('Activity', ActivitySchema);
}());
