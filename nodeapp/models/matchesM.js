const db = require ('../helpers/db');

const storeMatch = async (user, m_uuid) => {
    let cypher = `MATCH (n:user), (m:user)
    WHERE n.uuid = {uuid} AND m.uuid = {m_uuid} AND n.uuid <> m.uuid AND NOT (n)-[:BLOCKS]-(m)
    MERGE (n)-[r:HEARTS]->(m)`;
    let params = {uuid: user.uuid, m_uuid: m_uuid};
    await db.query(cypher, params);
    return ({ msg: `user hearts ${m_uuid}.` });
}

const deleteMatch = async (user, m_uuid) => {
    let cypher = `MATCH (n:user)-[r:HEARTS]->(m:user)
    WHERE n.uuid = {uuid} AND m.uuid = {m_uuid} AND n.uuid <> m.uuid
    DELETE r`;
    let params = {uuid: user.uuid, m_uuid: m_uuid};
    await db.query(cypher, params);
    return ({ msg: `user no longer hearts in ${m_uuid}.` });
}

const storeBlock = async (user, m_uuid) => {
    let cypher = `MATCH (n:user), (m:user)
    WHERE n.uuid = {uuid} AND m.uuid = {m_uuid}
    OPTIONAL MATCH (n)-[r]-(m)
    DELETE r
    MERGE (n)-[r2:BLOCKS]->(m)`;
    let params = {uuid: user.uuid, m_uuid: m_uuid};
    await db.query(cypher, params);
    return ({ msg: `user hearts ${m_uuid}.` });
}

const deleteBlock = async (user, m_uuid) => {
    let cypher = `MATCH (n:user)-[r:BLOCKS]-(m:user)
    DELETE r`;
    let params = {uuid: user.uuid, m_uuid: m_uuid};
    await db.query(cypher, params);
    return ({ msg: `user hearts ${m_uuid}.` });
}

module.exports = {
    storeMatch:     storeMatch,
    deleteMatch:    deleteMatch,
    storeBlock:     storeBlock,
    deleteBlock:    deleteBlock,
}
//test new account, check if position is stored correctly

/*
MATCH (n:user), (m:user) WHERE n.username = 'yexapa' AND m.username = "fojosiv" OPTIONAL MATCH (n)-[r]-(m) DELETE r MERGE (n)-[r2:BLOCKS]->(m)
*/