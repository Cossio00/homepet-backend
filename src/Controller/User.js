const db = require('../dbConfig/db');

async function getUsers(){
    
    const rows = await db.query(`SELECT * FROM user;`); 
    return rows;

}

async function getUser(req, res){
    
    let { userid } = req.params
    sql = `SELECT * FROM user where userid = ` + userid
    
    const row = await db.query(`SELECT * FROM user;`); 
    return row; 
}

async function createUser(req, res){
    const {
        username,
        useremail,
        userpassword,
        usercpf,
        userphone,
        useraddress,
        usertype
    } = req.body

    const connection = await connect();
    
    sql = "INSERT INTO user (username, useremail, userpassword, usercpf, userphone, useraddress, usertype) VALUES ?"
    value = [[username, useremail, userpassword, usercpf, userphone, useraddress, usertype]]

    connection.query(sql, [value], function(err, result){
        if(err) throw err;
        console.log("number of records inserted: "+ result.affectedRows)
    })
    
}

module.exports= { getUsers, getUser, createUser }