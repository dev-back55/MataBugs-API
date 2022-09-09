import request from "supertest";
import { expect } from 'chai';
import { sequelize } from '../database/db.js';
import app from '../app.js';
import {createPlayer} from "./auxfunction.js";

describe('Routes:--`signup`--`login`--`player`--', function () {
    let token;
    //En este test estamos Hardcodeando un admin en la DB...
    it('POST login admin, obtenemos el token', async function () {
        await sequelize.sync({ force: true })
        await createPlayer('enzo', 'enzo@gmail.com', 'alguno por defecto', 'enzo123', 'true')
        const response = await request(app)
            .post('/login')
            .send({ 'email': 'enzo@gmail.com', 'password': 'enzo123'})
        expect(200)
        return token = response.body.token
    })
    it('POST admin agrega un nuevo player, responde con un mensaje de confirmación y su status correspondiente', async function () {
        await createPlayer('horacio', 'horacio@gmail.com', 'alguno por defecto', 'hora123')
        await createPlayer('lucas', 'lucas@gmail.com', 'alguno por defecto', 'lucas123')
        const response = await request(app)
            .post('/signup')
            .set('Authorization', 'Bearer ' + token)
            .send({ 'nickname': 'fede', 'email': 'fede@gmail.com', 'avatar': 'alguno por defecto', 'password': 'fede123' })
        expect(response.status).to.eql(200);
        expect(response.body.msg).to.eql(`player create successfully`)
    })
    it('DELETE admin elimina a horacio(id:2), responde con un mensaje de confirmación y su status correspondiente', async function () {
        const response = await request(app)
            .delete('/player/2')
            .set('Authorization', 'Bearer ' + token)
        expect(response.status).to.eql(200);
        expect(response.body).to.eql(`The player was eliminated`)
    })
    it('PUT admin edita a lucas(id:3) y lo banea, responde con un mensaje de confirmación y su status correspondiente', async function () {
        const response = await request(app)
            .put('/player')
            .set('Authorization', 'Bearer ' + token)
            .send({ 'nickname': 'lucasB', 'avatar': 'otro avatar', 'isactive':false, 'idCard': 3 })
        expect(response.status).to.eql(200);
        expect(response.body).to.eql(`The player 3 has been updated`)
    })
    it('POST se loguea el jugador, obtenemos el token', async function () {
        const response = await request(app)
            .post('/login')
            .send({ 'email': 'fede@gmail.com', 'password': 'fede123' })
        expect(200)
        return token = response.body.token
    })
    it('PUT el jugador logueado edita su nickname y su avatar, responde con un mensaje de confirmación', async function () {
        const response = await request(app)
            .put('/player')
            .set('Authorization', 'Bearer ' + token)
            .send({ 'nickname': 'fedeRomero', 'avatar': 'otro avatar', 'idCard': 4 })
        expect(response.status).to.eql(200);
        expect(response.body).to.eql('your profile has been successfully updated')
    })
    it('POST se registra el jugador(`signup`), obtenemos el token', async function () {
        const response = await request(app)
            .post('/signup')
            .send({ 'nickname': 'gabi', 'email': 'gabi@gmail.com', 'avatar':'alguno por defecto', 'password': 'gabi123' })
        expect(200)
        return token = response.body.token
    })
    it('PUT el jugador registrado edita su nickname y su avatar, responde con un mensaje de confirmación', async function () {
        const response = await request(app)
            .put('/player')
            .set('Authorization', 'Bearer ' + token)
            .send({ 'nickname': 'gabip', 'avatar': 'otro avatar', 'idCard': 5})
        expect(response.status).to.eql(200);
        expect(response.body).to.eql('your profile has been successfully updated')
    })
    afterAll(async () => {
        await sequelize.sync({ force: true })
        await sequelize.close();
    });
})