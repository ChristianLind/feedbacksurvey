const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    survey: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});

//Creating collection and adding schema
const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;