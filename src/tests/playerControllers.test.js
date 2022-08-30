import { expect } from 'chai';
import { signUp } from '../controllers/auth.controllers.js';
import { sequelize } from '../database/db.js';
import { createPlayer, deletePlayerById, getHallOfFame, getPlayerById, searchPlayers } from './../controllers/players.controllers.js';


describe('--`signUp`--`getHallOfFame`--`getPlayerById`--`deletePlayerById`--', function () {
    beforeEach(async function () {
            const reset = await sequelize.sync({ force: true })
            expect(reset)
      })
    it('Inicialmente devuelve un arreglo de usuarios vacío', async function () {
        const getAllPlayers = await getHallOfFame()
        expect(getAllPlayers).to.eql([])
    })
    it('Agrega un usuario a la lista y devuelve un mensaje de confirmación. Trae todos los jugadores de la lista y comprueba que sea solo 1', async function () {
        const newPlayer = await signUp('enzoSS', 'enzo2@gmail.com', 'alguno por defecto', 'riverplate')
        const getAllPlayers = await getHallOfFame()
        expect(newPlayer.msg).to.eql("player create successfully")
        expect(getAllPlayers).to.have.length(1)
    })
    it('Agrega un usuario a la lista, lo busca por id y comprueba su nickname. Por ultimo, lo elimina por id', async function () {
        const newPlayer = await signUp('enzoSS', 'enzo2@gmail.com', 'alguno por defecto', 'riverplate')
        const getPlayer = await getPlayerById(newPlayer.player.id)
        expect(getPlayer.nickname).to.eql('enzoSS')
        const deletePlayer = await deletePlayerById(getPlayer.id)
        expect(deletePlayer).to.eql(`The player was eliminated`)
    })
    it('Agrega Players y los filtra', async function () {
        const player1 = await createPlayer({nickname:'enzoSS', email:'enzo2@gmail.com', avatar:'alguno por defecto', password:'riverplate'})
        const player2 = await createPlayer({nickname:'enzoSS3', email:'enzo4@gmail.com', avatar:'alguno por defecto', password:'riverplate3'})
        const player3 = await createPlayer({nickname:'enzoSS2', email:'enzo3@gmail.com', avatar:'alguno por defecto', password:'riverplate2'})
        const findId = await getPlayerById(3)
        const player4 = await createPlayer({nickname:'enzoSS4', email:'enzo5@gmail.com', avatar:'alguno por defecto', password:'riverplate4'})
        const filter = await searchPlayers({text:'enzoSS2'})
        expect(filter).to.eql({"players": [findId], "results": 1, "totalPages": 1})
    })
})