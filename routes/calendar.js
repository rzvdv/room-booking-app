const { Router } = require('express');
const { google } = require('googleapis');

const config = require('../config')

const auth = require('../auth');

const router = Router();

let calendar;

auth(auth => calendar = google.calendar({ version: 'v3', auth }))

router.get('/', async (req, res) => {
    /** 
        @todo: Implement route to get events by date
        {@link https://developers.google.com/calendar/quickstart/nodejs#step_3_set_up_the_sample guide}
    **/
});

module.exports = router;