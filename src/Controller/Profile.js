const { connect } = require('../db');

async function getProfiles(){
    const conn = await connect();
    return await conn.query(`SELECT * FROM homepet.profile;`); 
}


module.exports= { getProfiles }