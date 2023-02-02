const db = require('../dbConfig/db');

async function getProfiles(){

    const rows = await db.query(`SELECT * FROM homepet.profile`);    
    return rows;
}


module.exports= { getProfiles }