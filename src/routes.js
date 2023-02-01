const { Router } = require('express');


const router = Router();
const { getProfiles } = require('./Controller/Profile');
const { getUsers, createUser } = require('./Controller/User');

router.get('/profile', getProfiles)

router.get('/user', getUsers)
router.post('/user', createUser)


module.exports = router;