const config = {
    apiVer:     'v1',
    hostname:   '127.0.0.1',
    port:       3001,
};
config.baseUrl= `/api/${config.apiVer}`;

module.exports = config;