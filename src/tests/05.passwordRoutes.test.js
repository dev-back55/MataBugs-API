import request from "supertest";
import { expect } from 'chai';
import { sequelize } from '../database/db.js';
import app from '../app.js';
import Player from '../models/Player.js';
import jwt from 'jsonwebtoken';
import { secret, expires } from '../auth.js';

describe('Routes:--`password`--', function () {
    let token;
    //En este test generamos el token que nos llegaria por mail
    it('POST email, obtenemos un mensaje', async function () {
        let playerInDb = await Player.findOne({where:{email:'enzo@gmail.com'}})
        token = jwt.sign({ player: playerInDb }, secret, {expiresIn: expires});
        const response = await request(app)
            .post('/password')
            .send({ 'email': 'enzo@gmail.com'})
        expect(response.status).to.eql(200)
        expect(response.body).to.eql("We have sent an email to your mailbox so that you can update your password")
    })
    it('PUT se ingresa la nueva password y el token, se obtiene un mensaje', async function () {
        const response = await request(app)
            .put('/password')
            .send({ 'password': 'enzoSanchez', 'token':token})
        expect(response.status).to.eql(200)
        expect(response.body).to.eql("the password has been updated successfully")
    })
    it('POST email invalido, obtenemos un mensaje de error', async function () {
        const response = await request(app)
            .post('/password')
            .send({ 'email': 'carlos@gmail.com'})
        expect(response.status).to.eql(400)
        expect(response.body).to.eql("that user does not exist")
    })
    afterAll(async () => {
        await sequelize.close();
    });
})