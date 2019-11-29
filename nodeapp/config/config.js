const conf = {
    apiReq:        'http',
    apiVer:     'v1',
    hostname:   'localhost',
    port:       3001,
    
    viewDomainName:    'localhost',
    viewPort:          3000,
    viewReq:        'http',
};
conf.baseUrl= `/api/${conf.apiVer}`;
conf.viewUrl = `${conf.viewReq}://${conf.viewDomainName}:${conf.viewPort}`;

module.exports = conf;