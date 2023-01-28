const { openDB } = require('../configDB');  

module.exports={
    async createTableService(){
        openDB().then(db=>{
            db.exec(`
                CREATE TABLE IF NOT EXISTS service(
                    serviceid TEXT PRIMARY KEY,
                    servicedescription TEXT NOT NULL,
                    servicevalue REAL NOT NULL
                )`)
        })
    }


}