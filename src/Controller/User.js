const { connect } = require('../db');

async function getUsers(){
    const connection = await connect();
    return await connection.query(`SELECT * FROM user;`); 
}

async function createUser(req, res){
    console.log(req.body)
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

module.exports= { getUsers, createUser }