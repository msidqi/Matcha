const db = require ('../helpers/db');

const storeSexpref = async (user, sexpref = '') => {
    let cypher = '';
    let params = '';
    if (sexpref === 'Both')
    {
        cypher =
        `MATCH (n:user)
        WHERE n.uuid = {uuid}
        MERGE (sx:sexpref {type: 'Male'})
        MERGE (n)-[r:SEXPREF]->(sx)
        MERGE (sx2:sexpref {type: 'Female'})
        MERGE (n)-[rn:SEXPREF]->(sx2)`;
        params = {uuid: user.uuid};
    } else {
        cypher =
        `MATCH (n:user)
        WHERE n.uuid = {uuid}
        MERGE (sx:sexpref {type: {sexpref}})
        MERGE (n)-[r:SEXPREF]->(sx)`;
        sexpref = (sexpref == 'Males') ? 'Male' : 'Female';
        params = {uuid: user.uuid, sexpref: sexpref};
    }
    await db.query(cypher, params);
    return ({ msg: `user is ${sexpref}.`, status: 'OK' });
}

const changeSexpref = async (user, sexpref = '') => {
    let cypher = '';
    let params = '';
    if (sexpref === 'Both')
    {
        cypher =
        `MATCH (n:user)
        WHERE n.uuid = {uuid}
        MERGE (sx2:sexpref {type: 'Male'})
        MERGE (n)-[rn:SEXPREF]->(sx2)
        MERGE (sx2:sexpref {type: 'Female'})
        MERGE (n)-[rn:SEXPREF]->(sx2)`;
        params = {uuid: user.uuid};
    } else {
        cypher =
        `MATCH (n:user)-[r:SEXPREF]->(sx:sexpref)
        WHERE n.uuid = {uuid}
        DELETE r
        MERGE (sx2:sexpref {type: {sexpref}})
        MERGE (n)-[rn:SEXPREF]->(sx2)`;
        sexpref = (sexpref == 'Males') ? 'Male' : 'Female';
        params = {uuid: user.uuid, sexpref: sexpref};
    }
    await db.query(cypher, params);
    return ({ msg: `user is now ${sexpref}.` });
}

module.exports = {
    storeSexpref:   storeSexpref,
    changeSexpref:  changeSexpref,
}

/*

MATCH (n:user {uuid: 'b6de283a-b913-403c-8fd3-ffbe3029f14e'})-[r:SEXPREF]->(sx:sexpref)
WITH n.uuid as uuid, n.gender as n_gender, sx.type as n_sexpref
MATCH (m:user)-[r2:SEXPREF]->(sx2)
WHERE m.gender = n_sexpref AND sx2.type = n_gender AND m.uuid <> uuid
RETURN m

MATCH (t1:tag)<-[r1:INTERESTED_IN]-(n:user {uuid: 'b6de283a-b913-403c-8fd3-ffbe3029f14e'})-[r0:SEXPREF]->(sx:sexpref)
WITH n.uuid as uuid, n.gender as n_gender, sx.type as n_sexpref, t1 as t1
MATCH (t2:tag)<-[r3:INTERESTED_IN]-(m:user)-[r2:SEXPREF]->(sx2)
WHERE m.gender = n_sexpref AND sx2.type = n_gender AND m.uuid <> uuid AND t2.name = t1.name
RETURN m

MATCH (sx2:sexpref)<-[r3:SEXPREF]-(m:user)-[r2:INTERESTED_IN]->(t1:tag)<-[r1:INTERESTED_IN]-(n:user {uuid: 'b6de283a-b913-403c-8fd3-ffbe3029f14e'})-[r0:SEXPREF]->(sx1:sexpref)
WHERE m.gender = sx1.type AND sx2.type = n.gender AND m.uuid <> n.uuid
RETURN DISTINCT m
#RETURN (m)-[r2]->(t1)<-[r1]-(n)


---> returns each user with a number of commmon tags
MATCH (sx2:sexpref)<-[r3:SEXPREF]-(m:user)-[r2:INTERESTED_IN]->(t:tag)<-[r1:INTERESTED_IN]-(n:user {uuid: 'b6de283a-b913-403c-8fd3-ffbe3029f14e'})-[r0:SEXPREF]->(sx1:sexpref)
WHERE m.gender = sx1.type AND sx2.type = n.gender AND m.uuid <> n.uuid
WITH {user:m, numOfTags: COUNT(DISTINCT t)} AS ret
RETURN DISTINCT ret ORDER BY ret.numOfTags DESC, ret.user.score DESC


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