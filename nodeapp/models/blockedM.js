const db = require ('../helpers/db');

const storeBlock = async (user, m_uuid) => {
    let cypher = `MATCH (n:user), (m:user)
    WHERE n.uuid = {uuid} AND m.uuid = {m_uuid}
    OPTIONAL MATCH (n)-[r]-(m)
    DELETE r
    MERGE (n)-[r2:BLOCKS]->(m)`;
    let params = {uuid: user.uuid, m_uuid: m_uuid};
    let result = await db.query(cypher, params);
    console.log(result);
    return ({msg: result.summary.counters._stats.relationshipsCreated ? `user blocked ${m_uuid}.` : `user can't block ${m_uuid}.`});
}

const deleteBlock = async (user, m_uuid) => {
    let cypher = `MATCH (n:user)-[r:BLOCKS]-(m:user)
    WHERE n.uuid = {uuid} AND m.uuid = {m_uuid} AND n.uuid <> m.uuid
    DELETE r`;
    let params = {uuid: user.uuid, m_uuid: m_uuid};
    let result = await db.query(cypher, params);
    return ({msg: result.summary.counters._stats.relationshipsDeleted ? `user no longer blocks ${m_uuid}.` : `user can't block ${m_uuid}.`});
}

const loadBlocked = async (uuid) => {
    let cypher = `MATCH (n:user)-[r:BLOCKS]->(m:user)
    WHERE n.uuid = {uuid}
    WITH {username: m.username, firstname: m.firstname, lastname: m.lastname,
    score: m.score, uuid: m.uuid, birthdateShort: m.birthdateShort,
    gender: m.gender, completed: m.completed, verified: m.verified, picIndex: m.picIndex, pictures: m.pictures,
    latitude: m.latitude, longitude: m.longitude} as ret
    RETURN ret`;
    let params = {uuid: uuid};
    let result = await db.query(cypher, params);
    return (result.records);
}

module.exports = {
    storeBlock:     storeBlock,
    deleteBlock:    deleteBlock,
    loadBlocked:    loadBlocked,
}
//test new account, check if position is stored correctly

/*
MATCH (n:user), (m:user) WHERE n.username = 'yexapa' AND m.username = "fojosiv" OPTIONAL MATCH (n)-[r]-(m) DELETE r MERGE (n)-[r2:BLOCKS]->(m)
*/