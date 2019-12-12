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
        q1: req.body.q1,
        q2: req.body.q2,
        q3: req.body.q3,
        survey: req.body.survey,
        points: 1,
        q4: req.body.q4,
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('survey-poll', 'survey-gender', {
            data: vote.survey, 
        });
        pusher.trigger('survey-poll', 'survey-rate', {
            data: vote.q3,
        });
        pusher.trigger('survey-poll', 'survey-age', {
            data: vote.q4,
        });
        return res.json({success: true, message: 'Thank you for completing the survey'})
    });
});

module.exports = router;