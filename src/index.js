const expres = require('express');
const app = expres();

const { ServerConfig } = require('./config');

app.listen(ServerConfig.PORT, () => {
    console.log(`Server running on port ${ServerConfig.PORT}`);
})