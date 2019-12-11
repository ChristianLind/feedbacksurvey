const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '916196',
    key: 'fdf06cf9be05339caec3',
    secret: 'a5ea588ab661ec30ab3e',
    cluster: 'eu',
    encrypted: true
});

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({ success : true, votes: votes}));
});

router.post('/', (req, res) => {
    const newVote = {
        survey: req.body.survey,
        points: 1
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('survey-poll', 'survey-vote', {
            points: parseInt(vote.points),
            survey: vote.survey
        });
        return res.json({success: true, message: 'Thank you for completing the survey'})
    });
});

module.exports = router;