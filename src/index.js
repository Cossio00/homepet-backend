const { getProfiles } = require('./Controller/Profile');
const { createUser, getUser } = require('./Controller/User');

(async()=>{


    console.log('Iniciado');
    const [perfis] = await getProfiles();
    
    Usuario = {
        params: {
            userid: 2
        },
        body:{
            username: 'Vini',
            useremail: 'Vini',
            userpassword: 'Vini',
            usercpf: 'Vini',
            userphone: 'Vini',
            useraddress: 'Vini',
            usertype: 2
            }
        }


    //await createUser(Usuario)
    

    const [perfil] = await getUser(Usuario)
    console.log(perfil)

})();
