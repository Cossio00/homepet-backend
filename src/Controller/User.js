const db = require('../dbConfig/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const { response } = require('express');

require('dotenv-safe').config();

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
/*
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
}*/

async function createUser(req, res){
    const {
        username,
        useremail,
        userpassword,
    } = req.body
    
    saltRounds = 10
 
    usercpf = undefined
    userphone = undefined,
    useraddress = undefined,
    usertype = 2

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(userpassword, salt);

    sqlSelect = `SELECT COUNT(*) FROM user where useremail = '${useremail}'`
    
    sql = `INSERT INTO user (username, useremail, userpassword, usercpf, userphone, useraddress, usertype) 
    VALUES 
    ('${username}', '${useremail}', '${hashPassword}', '${usercpf}', '${userphone}', '${useraddress}', ${usertype})`;

    
    try{
        const [emailQuantity, ] = await db.query(sqlSelect);
        if(emailQuantity['COUNT(*)'] > 0) throw err;
    }catch(err){
        res.status(404).json({message: 'USER_EMAIL_ALREADY_EXISTS'}).message('USER_EMAIL_ALREADY_EXISTS');
    }finally{
        
        const result = await db.query(sql)
    
        message = 'Erro ao criar Usuário';
        
        if (result.affectedRows) {
            message = 'Usuário criado com sucesso';
        }

        return {message};
    }
}

async function userLogin(req, res){
    const {
        useremail,
        userpassword
    } = req.body
   
    sql = `SELECT userid, userpassword FROM user where useremail = '${useremail}'`
    
    id = -1;
    try {
        const [row, ] = await db.query(sql)
        
        id = row.userid
        const match = await bcrypt.compare(userpassword, row.userpassword);

        if(!match) throw err;
        
    }catch(err){
        res.status(404).json({message: 'ACCOUNT_USER_NOT_FOUND_OR_INACTIVE'});
    }finally {
        
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 1800
        });
        res.status(202).json({auth: true, userid: id, token: token});
    }
}

async function userLogout(req, res){
    res.json({auth: false, token: null});
}

module.exports= { getUsers, getUser, showUser, createUser, userLogin, userLogout }