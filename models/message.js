const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: { type: String, required: true, maxlength: 40 },
    text: { type: String, required: true, maxlength: 150 },
    date: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Message', MessageSchema);