const db = require ('../helpers/db');

const storeSexpref = async (user, sexpref = '') => {
    let cypher =
    `MATCH (n:user)
    WHERE n.uuid = {uuid}
    MERGE (sx:sexpref {type: {sexpref}})
    MERGE (n)-[r:SEXPREF]->(sx)`;

    let cypher2 = '';
    if (sexpref === 'both')
        cypher2 = `MERGE (sx:sexpref {type: {sexpref}})
        MERGE (n)-[r:SEXPREF]->(sx)`;
    sexpref = (sexpref == 'Males') ? 'Male' : 'Female';
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
    sexpref = (sexpref == 'Males') ? 'Male' : 'Female';
    let params = {uuid: user.uuid, sexpref: sexpref};
    await db.query(cypher, params);
    return ({ msg: `user is now ${sexpref}.` });
}

module.exports = {
    storeSexpref:   storeSexpref,
    changeSexpref:  changeSexpref,
}

/*

MATCH (n:user {uuid: 'b6de283a-b913-403c-8fd3-ffbe3029f14e'})-[r:SEXPREF]->(sx:sexpref)
WITH n.uuid as uuid, n.gender as gender, sx.type as sexpref
MATCH (m:user)-[r:SEXPREF]->(sx2)
WHERE m.gender = sexpref AND sx2.type = gender
RETURN m








interseted by Females
if (user.sexpref)


MATCH (n:user)-[r:SEXPREF]->(sx:sexpref {type:'Females'})
WHERE n.uuid <> {user's uuid}
RETURN (n)-[r]->(sx)
*/

/*
MATCH (n:user)-[r:INTERESTED_IN]->(t)
WHERE n.uuid = '193ca4bb-9702-405d-9f8a-c3ed5e39f96a' AND t.name='#WEW'
DELETE r
MERGE (t2:tag {name: '#E'})
MERGE (n)-[rn:INTERESTED_IN]->(t2)
RETURN (n)-[]->()
*/