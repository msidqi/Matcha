const db = require ('../helpers/db');

const storeTagsLike = async (user, tags = []) => {
    if (tags.length == 0)
        throw 'No tags specified.'
    let cypher = `MATCH (n:user) WHERE n.uuid = {uuid}`;
    let params = {uuid: user.uuid};

    for (let i = 0; i < tags.length; i++) {
        cypher += ` MERGE (t${i}:tag {name: {tagname${i}}}) MERGE (n)-[r${i}:INTERESTED_IN]->(t${i})`;
        params[`tagname${i}`] = tags[i];
    }
    // cypher += ` RETURN (n)-[:INTERESTED_IN]->(:tag);`
    await db.query(cypher, params);
    return ({ msg: `user interested in  ${tags}.`, status: 'OK' });
}

const deleteTagLike = async (user, tags = []) => {
    if (tags.length == 0)
        throw 'No tags specified.';
    let cypher = `MATCH (n:user)`;
    let cypher2 = '';
    let params = {uuid: user.uuid};
    let todelete = '';
    for (let i = 0; i < tags.length; i++) {
        cypher += `,(t${i}:tag {name: {tagname${i}}})`;
        cypher2 += ` OPTIONAL MATCH (n)-[r${i}:INTERESTED_IN]->(t${i})`;
        params[`tagname${i}`] = tags[i];
        if (!todelete)
            todelete += `r${i}`;
        else
            todelete += `,r${i}`;
    }
    cypher += ` WHERE n.uuid = {uuid} ${cypher2} DELETE ${todelete}`;
    let result = await db.query(cypher, params);
    return ({ msg: `user not longer interested in ${tags}.` });
}

module.exports = {
    storeTagsLike: storeTagsLike,
    deleteTagLike: deleteTagLike,
}

// const storeTagsLike = async (user, tags = []) => {
//     if (tags.length == 0)
//         throw 'No tags specified.'
//     let cypher = `MATCH (n:user) WHERE n.uuid = {uuid}`;
//     let params = {uuid: user.uuid};

//     for (let i = 0; i < tags.length; i++) {
//         cypher += ` MERGE (n)-[r${i}:INTERESTED_IN]->(t${i}:tag {name: {tagname${i}}})`
//         params[`tagname${i}`] = tags[i];
//     }
//     console.log(cypher);
//     // cypher += ` RETURN (n)-[:INTERESTED_IN]->(:tag);`
//     await db.query(cypher, params);
//     return ({ msg: `user interested in  ${tags}.`, status: 'OK' });
// }