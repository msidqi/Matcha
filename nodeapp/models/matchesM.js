const db = require ('../helpers/db');

const storeMatch = async (user, m_uuid) => {
    let cypher = `MATCH (sx2:sexpref)<-[r3:SEXPREF]-(m:user {uuid: {m_uuid}})-[r2:INTERESTED_IN]->(t:tag)<-[r1:INTERESTED_IN]-(n:user {uuid: {uuid}})-[r0:SEXPREF]->(sx1:sexpref)
	WHERE m.gender = sx1.type AND sx2.type = n.gender AND m.uuid <> n.uuid AND NOT (n)-[:BLOCKS]-(m)
    MERGE (n)-[r:HEARTS]->(m)`;

    // `MATCH (n:user), (m:user)
    // WHERE n.uuid = {uuid} AND m.uuid = {m_uuid} AND n.uuid <> m.uuid AND  AND NOT (n)-[:BLOCKS]-(m)
    // MERGE (n)-[r:HEARTS]->(m)`;
    let params = {uuid: user.uuid, m_uuid: m_uuid};
    let result = await db.query(cypher, params);
    return ({msg: result.summary.counters._stats.relationshipsCreated ? `user hearts ${m_uuid}.` : `user can't heart ${m_uuid}.`});
}

const deleteMatch = async (user, m_uuid) => {
    let cypher = `MATCH (n:user)-[r:HEARTS]->(m:user)
    WHERE n.uuid = {uuid} AND m.uuid = {m_uuid} AND n.uuid <> m.uuid
    DELETE r`;
    let params = {uuid: user.uuid, m_uuid: m_uuid};
    let result = await db.query(cypher, params);
    return ({msg: result.summary.counters._stats.relationshipsDeleted ? `user no longer hearts ${m_uuid}.` : `user can't unheart ${m_uuid}.`});
}

module.exports = {
    storeMatch:     storeMatch,
    deleteMatch:    deleteMatch,
}
//test new account, check if position is stored correctly

/*
MATCH (n:user), (m:user) WHERE n.username = 'yexapa' AND m.username = "fojosiv" OPTIONAL MATCH (n)-[r]-(m) DELETE r MERGE (n)-[r2:BLOCKS]->(m)
*/