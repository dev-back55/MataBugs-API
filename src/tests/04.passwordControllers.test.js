import { expect } from 'chai';
import { changePassword, recoverPassword, updatePassword } from '../controllers/password.controllers.js';
import { sequelize } from '../database/db.js';
import Player from '../models/Player.js';
import jwt from 'jsonwebtoken';
import { secret, expires } from '../auth.js';
import { createPlayer } from '../controllers/players.controllers.js';

describe('-`recoverPassword`-`updatePassword`', function () {
    let token;
    it('La funcion recoverPassword recibe un mail y devuelve un mensaje', async function () {
        await sequelize.sync({ force: true })
        await createPlayer({ 'nickname': 'enzo', 'email': 'enzo@gmail.com', 'avatar': 'alguno por defecto', 'password': 'enzo123', 'admin': true })
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
    it('La funcion changePassword id del player que quiere cambiar su password, su password antigua y la nueva', async function(){
        await createPlayer({ nickname: 'carlos', email: 'carlos@gmail.com', avatar: 'a.jpg', password: 'carlos123'})
        const newPassword = await changePassword(2,'carlos123','carlitos321')
        expect(newPassword).to.eql('password updated')
    })
    afterAll(async () => {
        await sequelize.sync({ force: true })
        await sequelize.close();
    });
});