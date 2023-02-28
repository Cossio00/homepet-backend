const { Router } = require('express');
const router = Router();
const { getProfiles } = require('./Controller/Profile');
const { getUsers, createUser, showUser, userLogin, userLogout } = require('./Controller/User');

const verifyJWT = require('./auth');

router.get('/profile', async function(req, res){
    try{
        res.json(await getProfiles());
    } catch(err){
        console.error('Erro ao obter lista de perfis ', err.message);
    }
})


router.get('/user', verifyJWT, async function(req, res){
    try{
        res.json(await getUsers());
    } catch(err){
        console.error('Erro ao obter lista de usuários ', err.message);
    }
})

router.get('/user/:userid', async function(req, res){
    try{
        res.json(await showUser(req));
    } catch(err){
        console.error('Erro ao obter usuário ', err.message);
    }
})

router.post('/user', async function(req, res){
    try{
        res.json(await createUser(req, res));
    } catch(err){
        console.error('Erro ao criar Usuário ', err.message);
    }
})

router.post('/login', async function(req, res){
    try{
        res.json(await userLogin(req, res)); 
    } catch(err){
        console.error('Erro ao realizar login: ', err.message);
    }
})

router.post('/logout', async function(req, res){
    try{
        res.json(await userLogout(req, res));
    } catch(err){
        console.error('Erro ao realizar logout: ', err,message);
    }
})


module.exports = router;