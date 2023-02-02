const db = require('../dbConfig/db');

async function getUsers(){
    
    const rows = await db.query(`SELECT * FROM user;`); 
    return rows;

}

async function getUser(req, res){
    
    let { userid } = req.params
    sql = `SELECT * FROM user where userid = ` + userid
    
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
    
    sql = `INSERT INTO user (username, useremail, userpassword, usercpf, userphone, useraddress, usertype) 
            VALUES 
            ('${username}', '${useremail}', '${userpassword}', '${usercpf}', '${userphone}', '${useraddress}', ${usertype})`;
    
    const result = await db.query(sql)
    
    message = 'Erro ao criar Usuário';
    
    if (result.affectedRows) {
        message = 'Usuário criado com sucesso';
    }

  return {message};
}

module.exports= { getUsers, getUser, createUser }