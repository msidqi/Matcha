const config = {
    apiVer:     'v1',
    hostname:   'localhost',
    port:       3001,
};
config.baseUrl= `/api/${config.apiVer}`;

module.exports = config;