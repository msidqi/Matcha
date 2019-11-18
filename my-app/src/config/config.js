const conf = {
    req:        'http',
    domainName: 'localhost',
    port:       3000,
    apiDomainName: 'localhost',
    apiVer:     'v1',
    apiReq:        'http',
    apiPort:       3001,
};

conf.viewUrl = `${conf.req}://${conf.domainName}:${conf.port}`;
conf.apiUrl = `${conf.apiReq}://${conf.apiDomainName}:${conf.apiPort}/api/${conf.apiVer}`;

export default conf;