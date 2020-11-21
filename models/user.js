const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
        first_name: { type: String, required: true, maxlength: 15 },
        last_name: { type: String, required: true, maxlength: 20 },
        user_name: { type: String, required: true, maxlength: 12 },
        password: { type: String, required: true, minlength: 8, maxlength: 20 },
        member_status: { type: Boolean, required: true },
        admin_status: { type: Boolean },
});

UserSchema.virtual('name').get(function() {
    return `${this.first_name} ${this.last_name}`
});

UserSchema.virtual('url').get(function() {
    //UPDATE ROUTE
    return `/blah/user${this.id}`
});

module.exports = mongoose.model('User', UserSchema);