const { openDB } = require('../configDB');

module.exports={
    async createTableUser(){
        openDB().then(db=>{
            db.exec(`
                CREATE TABLE IF NOT EXISTS user(
                    userid INTEGER AUTOINCREMENT PRIMARY KEY,
                    username TEXT NOT NULL,
                    

                    userprofile
                )
            
            `)
        })
    }
}