const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '916196',
    key: 'fdf06cf9be05339caec3',
    secret: 'a5ea588ab661ec30ab3e',
    cluster: 'eu',
    encrypted: true
});

router.get('/', (req, res) => {
    res.send('POLL');
});

router.post('/', (req, res) => {
    pusher.trigger('survey-poll', 'survey-vote', {
        points: 1,
        survey: req.body.survey
    });
    return res.json({success: true, message: 'Thank you for completing the survey'})
});

module.exports = router;