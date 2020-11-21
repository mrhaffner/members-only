const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
        firstName: { type: String, required: true, maxlength: 15 },
        lastName: { type: String, required: true, maxlength: 20 },
        userName: { type: String, required: true, maxlength: 12, unique: true },
        password: { type: String, required: true, minlength: 8, maxlength: 20 },
        member_status: { type: Boolean, required: true },
        admin_status: { type: Boolean },
});

UserSchema.virtual('name').get(function() {
    return `this.firstName this.lastName`
});

UserSchema.virtual('url').get(function() {
    //UPDATE ROUTE
    return `/blah/user${this.id}`
});

module.exports = mongoose.model('User', UserSchema);