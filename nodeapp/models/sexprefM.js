const db = require ('../helpers/db');

const storeSexpref = async (user, sexpref = '') => {
    let cypher =
    `MATCH (n:user)
    WHERE n.uuid = {uuid}
    MERGE (sx:sexpref {type: {sexpref}})
    MERGE (n)-[r:SEXPREF]->(sx)`;
    let params = {uuid: user.uuid, sexpref: sexpref};
    await db.query(cypher, params);
    return ({ msg: `user is ${sexpref}.`, status: 'OK' });
}

const changeSexpref = async (user, sexpref = '') => {
    let cypher = 
    `MATCH (n:user)-[r:SEXPREF]->(sx:sexpref)
    WHERE n.uuid = {uuid}
    DELETE r
    MERGE (sx2:sexpref {type: {sexpref}})
    MERGE (n)-[rn:SEXPREF]->(sx2)`;
    let params = {uuid: user.uuid, sexpref: sexpref};
    await db.query(cypher, params);
    return ({ msg: `user is now ${sexpref}.` });
}

module.exports = {
    storeSexpref:   storeSexpref,
    changeSexpref:  changeSexpref,
}

/*
MATCH (n:user)-[r:INTERESTED_IN]->(t)
WHERE n.uuid = '193ca4bb-9702-405d-9f8a-c3ed5e39f96a' AND t.name='#WEW'
DELETE r
MERGE (t2:tag {name: '#E'})
MERGE (n)-[rn:INTERESTED_IN]->(t2)
RETURN (n)-[]->()
*/