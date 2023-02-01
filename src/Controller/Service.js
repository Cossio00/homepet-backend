//const { openDB } = require('../configDB'); 
const { openDB } = require('../db');

module.exports={
    async createTableService(){
        openDB().then(db=>{
            db.exec(`
                CREATE TABLE IF NOT EXISTS service(
                    serviceid TEXT PRIMARY KEY,
                    servicedescription TEXT NOT NULL,
                    servicevalue REAL NOT NULL,
                    servicecreator INTEGER NOT,
                    FOREIGN KEY(servicecreator) REFERENCES user(userid)
                )`)
        })
    }


}