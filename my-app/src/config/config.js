const conf = {
    domainName: 'localhost',
    port:       3001,
    apiVer:     'v1',
    req:        'http',
};

conf.urlRoot = `${conf.req}://${conf.domainName}:${conf.port}/api/${conf.apiVer}`;

export default conf;