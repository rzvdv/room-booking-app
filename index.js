const express = require('express');
const cors = require('cors');

const config = require('./config');
const calendarRoutes = require('./routes/calendar');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/calendar', calendarRoutes);

app.listen(config.port, () => {
    console.log(`🚀 Listening on port ${config.port} `);
});
