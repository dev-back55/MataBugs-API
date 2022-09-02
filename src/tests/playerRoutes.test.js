import request from "supertest";
import { expect } from 'chai';
import { sequelize } from '../database/db.js';
import app from '../app.js';
import { createPlayer } from "./../controllers/players.controllers.js";

describe('Routes:--`hallOfFame`--', function () {
    beforeEach(async function () {
        await sequelize.sync({ force: true })
    })
    it('GET inicialmente debe devolver un arreglo vacio', async function () {
        const response = await request(app)
            .get("/hallOfFame")
            .set('Accept', 'application/json')
        expect('Content-Type', /json/) // podemos testear los headers
        expect(response.status).to.eql(200);
        expect(response.body).to.eql([]) // testeamos la respuesta con el body
    })
    it('GET responde con un array con todos los usuarios', async function () {
        await createPlayer({ nickname: 'enzo', email: 'enzo@gmail.com', avatar: 'alguno por defecto', password: 'enzo123' })
        await createPlayer({ nickname: 'lucas', email: 'lucas@gmail.com', avatar: 'alguno por defecto', password: 'lucas123' })
        const response = await request(app)
            .get("/hallOfFame")
            .set('Accept', 'application/json')
        expect('Content-Type', /json/) // podemos testear los headers
        expect(response.status).to.eql(200);
        expect(response.body).to.eql([
            {
                "avatar": "alguno por defecto",
                "email": "enzo@gmail.com",
                "id": 1,
                "nickname": "enzo",
                "ranking": 0,
                "status": "bronce",
            },
            {
                "avatar": "alguno por defecto",
                "email": "lucas@gmail.com",
                "id": 2,
                "nickname": "lucas",
                "ranking": 0,
                "status": "bronce",
            }
        ])
    })
    afterAll(async () => {
        await sequelize.close();
     });
})