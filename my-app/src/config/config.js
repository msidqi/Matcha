const conf = {
    domainName: 'localhost',
    port:       3000,
    apiVer:     'v1',
    req:        'http',
};

conf.urlRoot = `${host.req}://${host.domainName}:${host.port}`;

export default conf;