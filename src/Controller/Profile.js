const { openDB } = require('../configDB');

module.exports={
    async createTableProfile(){
        openDB().then(db=>{
            db.exec(`
                CREATE TABLE IF NOT EXISTS profile(
                    profileid INTEGER AUTOINCREMENT PRIMARY KEY,
                    profilename TEXT
                )`)
        })
    }
}