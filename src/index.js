const express = require('express');
const app = express();

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const Cron  = require('./utils/common/cron-jobs');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Server running on port ${ServerConfig.PORT}`);
    Cron();
})