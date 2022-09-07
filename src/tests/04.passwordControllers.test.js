import { expect } from 'chai';
import { recoverPassword, updatePassword } from '../controllers/password.controllers.js';
import { sequelize } from '../database/db.js';
import Player from '../models/Player.js';
import jwt from 'jsonwebtoken';
import { secret, expires } from '../auth.js';

describe('-`recoverPassword`-`updatePassword`', function () {
    let token;
    it('La funcion recoverPassword recibe un mail y devuelve un mensaje', async function () {
        const newPassword = await recoverPassword('enzo@gmail.com')
        let playerInDb = await Player.findOne({where:{email:'enzo@gmail.com'}})
        token = jwt.sign({ player: playerInDb }, secret, {expiresIn: expires});
        expect(newPassword).to.eql("We have sent an email to your mailbox so that you can update your password")
    })
    it('La funcion updatePassword recibe una password nueva y el token, y devuelve un mensaje de confirmacion', async function () {
        const newPassword = await updatePassword('nuevaPassword',token)
        expect(newPassword).to.eql("the password has been updated successfully")
    })
    it('La funcion recoverPassword recibe un mail invalido y devuelve un mensaje', async function () {
        try {
            await recoverPassword('carlos@gmail.com')
        } catch (error) {
            expect(error.message).to.eql('that user does not exist')
        }
    })
    afterAll(async () => {
       await sequelize.close();
    });
});