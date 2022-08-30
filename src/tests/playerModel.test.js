import { expect } from 'chai';
import { signUp } from '../controllers/auth.controllers.js';
import { getHallOfFame } from './../controllers/players.controllers.js';
import { resetDB } from './auxfunctionstest.js';


describe('---------- `signUp` y `getHallOfFame` ----------', function () {
    it('Inicialmente devuelve un arreglo de usuarios vacío', async function () {
        const reset = await resetDB()
        expect(reset).to.eql(`All Player's DB`)
    })
    it('Agrega usuarios a la lista y devuelve un mensaje de confirmación', async function () {
        const newPlayer = await signUp('elEnzitoDeBera', 'enzito2@gmail.com', 'alguno por defecto', 'boquitatricampeon')
        const getAllPlayers = await getHallOfFame()
        expect(newPlayer.msg).to.eql("player create successfully")
        expect(getAllPlayers).to.have.length(1)
    })
})