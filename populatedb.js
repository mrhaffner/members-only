#! /usr/bin/env node

console.log('This script populates some test messages and user to my database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var User = require('./models/user')
var Message = require('./models/message')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var messages = []

function userCreate(first_name, last_name, username, password, member_status, admin_status, cb) {
  const user = new User({first_name, last_name, username, password, member_status, admin_status});
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log(`New User: ${user}`)
    users.push(user)
    cb(null, user)
  })
}

function messageCreate(title, text, date, author, cb) {
  const message = new Message({title, text, date, author});
  message.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log(`New Message: ${message}`)
    messages.push(message)
    cb(null, message)
  })
}

function createUsers(cb) {
  async.series([
    (callback) => userCreate('Steve', 'Smith', 'Stevesie', '12345678', true, false, callback),
    (callback) => userCreate('Buck', 'Ryan', 'Lucky', '12345678', true, false, callback),
    (callback) => userCreate('Anna', 'Johnson', 'Anastasia', '12345678', true, false, callback),
  ],
  cb);
}

function createMessages(cb) {
  async.parallel([
    (callback) => messageCreate('Eating from the Trash', 'I saw George eat an eclair straight out of the garbage can. Gross!', new Date(2019, 12, 17, 3, 24, 0), users[0], callback),
    (callback) => messageCreate('Rumors', "I'm glad no one knows who I am with all these rumors I am creating.", new Date(2020, 2, 13, 6, 30, 10), users[0], callback),
    (callback) => messageCreate('Be Nice', 'I only say nice things about people', new Date(2020, 2, 16, 13, 33, 30), users[2], callback),
    (callback) => messageCreate("Stevesie", 'Stevesie you have too much time on your hands.  I know you can read who wrote this', new Date(2020, 3, 1, 20, 1, 0), users[1], callback),
    (callback) => messageCreate('Password', "The password to become a member is definitely not password. Don't even try it. You will not be able to see who wrote this message.", new Date(2020, 8, 7, 16, 44, 44), users[0], callback),
  ],
  cb);
};

async.series([
    createUsers,
    createMessages,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log(`Messages: ${messages}`);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
