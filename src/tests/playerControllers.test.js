import { expect } from 'chai';
import { signUp } from '../controllers/auth.controllers.js';
import { sequelize } from '../database/db.js';
import { createPlayer, deletePlayerById, getHallOfFame, getPlayerById, searchPlayers, updatePlayer } from './../controllers/players.controllers.js';


describe('-`signUp`-`getHallOfFame`-`getPlayerById`-`deletePlayerById`-`createPlayer`-`SearchPlayers`-`updatePlayer`', function () {
    beforeEach(async function () {
            await sequelize.sync({ force: true })
      })
    it('Inicialmente devuelve un arreglo de jugadores vacío', async function () {
        expect(await getHallOfFame()).to.eql([])
    })
    it('Agrega un jugador a la lista y devuelve un mensaje de confirmación. Trae todos los jugadores de la lista y comprueba que sea solo 1', async function () {
        const newPlayer = await signUp('enzoSS', 'enzo2@gmail.com', 'alguno por defecto', 'riverplate')
        expect(newPlayer.msg).to.eql("player create successfully")
        expect(await getHallOfFame()).to.have.length(1)
    })
    it('Agrega un jugador a la lista, lo busca por id y comprueba su nickname. Por ultimo, lo elimina por id', async function () {
        const newPlayer = await signUp('enzoSS', 'enzo2@gmail.com', 'alguno por defecto', 'riverplate')
        const getPlayer = await getPlayerById(newPlayer.player.id)
        expect(getPlayer.nickname).to.eql('enzoSS')
        const deletePlayer = await deletePlayerById(getPlayer.id)
        expect(deletePlayer).to.eql(`The player was eliminated`)
    })
    it('Crea jugadores y los filtra', async function () {
        await createPlayer({nickname:'enzo', email:'enzo@gmail.com', avatar:'alguno por defecto', password:'enzo123'})
        await createPlayer({nickname:'lucas', email:'lucas@gmail.com', avatar:'alguno por defecto', password:'lucas123'})
        await createPlayer({nickname:'fede', email:'fede@gmail.com', avatar:'alguno por defecto', password:'fede123'})
        const findId = await getPlayerById(3)
        await createPlayer({nickname:'gabi', email:'gabi@gmail.com', avatar:'alguno por defecto', password:'gabi123'})
        expect(await getHallOfFame()).to.have.length(4)
        const filter = await searchPlayers({text:'fed'})
        expect(filter).to.eql({"players": [findId], "results": 1, "totalPages": 1})
    })
    it('Crea jugadores y los edita', async function (){
        await createPlayer({nickname:'enzo', email:'enzo@gmail.com', avatar:'alguno por defecto', password:'enzo123'})
        const nicknameUpdate = await updatePlayer(1,{nickname:'enzos',idCard:1})
        const player1 = await getPlayerById(1)
        expect(nicknameUpdate).to.eql('your profile has been successfully updated')
        expect(player1.nickname).to.eql('enzos')
    })
    it('Crea jugador lo convierte en Admin, este modifica a otro jugador y lo banea',async function (){
        await createPlayer({nickname:'fede', email:'fede@gmail.com', avatar:'alguno por defecto', password:'fede123'})
        await createPlayer({nickname:'lucas', email:'lucas@gmail.com', avatar:'alguno por defecto', password:'lucas123'})
        const adminUpdate = await updatePlayer(1,{admin:true,idCard:1})
        const player1 = await getPlayerById(1)
        expect(adminUpdate).to.eql('your profile has been successfully updated')
        expect(player1.admin).to.eql(true)
        const adminUpdatePlayer2 = await updatePlayer(1,{nickname:'lucasB',avatar:'otro avatar por defecto',isactive:false,idCard:2})
        expect(adminUpdatePlayer2).to.eql(`The player 2 has been updated`)
        const player2 = await getPlayerById(2)
        expect(player2.dataValues).to.eql({"admin": false, "avatar": "otro avatar por defecto", "email": "lucas@gmail.com", "id": 2, "isactive": false, "nickname": "lucasB", "password":player2.password, "ranking": 0, "status": "bronce"})
    })
    afterAll(async () => {
       await sequelize.close();
    });
});

