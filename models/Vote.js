const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
    q1: {
        type: String,
        required: true
    },
    q2: {
        type: String,
        required: true
    },
    q3: {
        type: String,
        required: true
    },
    survey: {
        type: String,
        required: false
    },
    points: {
        type: String,
        required: true
    },
    q4: {
        type: String,
        required: false
    }
});

//Creating collection and adding schema
const Vote = mongoose.model('Vote', VoteSchema);

module.exports = Vote;