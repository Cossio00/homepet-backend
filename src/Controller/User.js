const db = require('../dbConfig/db');
const bcrypt = require('bcrypt');

async function getUsers(){
    
    const rows = await db.query(`SELECT username, useremail, usercpf, userphone, useraddress, usertype FROM user;`); 
    return rows;

}

async function getUser(req, res){
    
    let { userid } = req.params
    sql = `SELECT username, useremail, usercpf, userphone, useraddress, usertype FROM user where userid = ` + userid
    
    const row = await db.query(sql); 
    return row; 
}

async function showUser(req, res){
    
    let { userid } = req.params
    sql = `SELECT username, useremail, userphone, usertype FROM user where userid = ` + userid
    
    const row = await db.query(sql); 
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
    
    saltRounds = 10
    
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(userpassword, salt);

    sql = `INSERT INTO user (username, useremail, userpassword, usercpf, userphone, useraddress, usertype) 
            VALUES 
            ('${username}', '${useremail}', '${hashPassword}', '${usercpf}', '${userphone}', '${useraddress}', ${usertype})`;
    
    const result = await db.query(sql)
    
    message = 'Erro ao criar Usuário';
    
    if (result.affectedRows) {
        message = 'Usuário criado com sucesso';
    }

  return {message};
}

module.exports= { getUsers, getUser, showUser, createUser }