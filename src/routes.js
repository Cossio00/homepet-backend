const { Router } = require('express');


const router = Router();
const { getProfiles } = require('./Controller/Profile');
const { getUsers, createUser, getUser } = require('./Controller/User');

router.get('/profile', async function(req, res){
    try{
        res.json(await getProfiles());
    } catch(err){
        console.error('Erro ao obter lista de perfis ', err.message);
    }
})


router.get('/user', async function(req, res){
    try{
        res.json(await getUsers());
    } catch(err){
        console.error('Erro ao obter lista de usuários ', err.message);
    }
})

router.get('/user/:userid', async function(req, res){
    try{
        res.json(await getUser(req));
    } catch(err){
        console.error('Erro ao obter usuário ', err.message);
    }
})

router.post('/user', async function(req, res){
    try{
        res.json(await createUser(req));
    } catch(err){
        console.error('Erro ao criar Usuário ', err.message);
    }
})


module.exports = router;