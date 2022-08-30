import { expect } from 'chai';
import { signUp } from '../controllers/auth.controllers.js';
import { deletePlayerById, getHallOfFame, getPlayerById } from '../controllers/players.controllers.js';
import { resetDB } from './auxfunctionstest.js';


describe('--`signUp`--`getHallOfFame`--`getPlayerById`--`deletePlayerById`--', function () {
    beforeEach(async function () {
        const reset = await resetDB()
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
})