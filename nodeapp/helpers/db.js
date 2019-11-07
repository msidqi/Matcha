const db_user = 'neo4j';
const db_passwd = 'neo4j';
const neo4j = require('neo4j-driver').v1
const driver = neo4j.driver('bolt://database', neo4j.auth.basic(db_user, db_passwd));

var query = async (query, params) => {
    const session = driver.session();
      try {
        let res = await session.run(query, params);
        session.close();
        return res;
      } catch (error) {
        throw(new Error(error))
      }
  }

var querypromise = (query, params) => {
    const session = driver.session();
    return session.run(query, params);
}

module.exports = {
    query : query,
    querypromise : querypromise
};