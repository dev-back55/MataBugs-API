import request from "supertest";
import { expect } from 'chai';
import { sequelize } from '../database/db.js';
import app from '../app.js';
import Player from "../models/Player.js"

describe('Routes:--`hallOfFame`--`/search`', function () {
    it('GET inicialmente debe devolver un arreglo vacio', async function () {
        await sequelize.sync({ force: true })
        const response = await request(app)
            .get("/hallOfFame")
            .set('Accept', 'application/json')
        expect('Content-Type', /json/) // podemos testear los headers
        expect(response.status).to.eql(200);
        expect(response.body).to.eql([]) // testeamos la respuesta con el body
    })
    it('GET responde con un array con todos los usuarios', async function () {
        await Player.create({ nickname: 'enzo', email: 'enzo@gmail.com', avatar: 'alguno por defecto', password: 'enzo123', status: "bronce" })
        await Player.create({ nickname: 'lucas', email: 'lucas@gmail.com', avatar: 'alguno por defecto', password: 'lucas123', status: "bronce" })
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
    it('GET filtra jugadores por nickname y status al ingresar un texto, ordenado por ranking', async function () {
        await Player.create({ nickname: 'enzo2', email: 'enzo2@gmail.com', avatar: 'a.jpg', password: 'enzo123', status: "oro", ranking: 8500 })
        await Player.create({ nickname: 'horacio', email: 'horacio@gmail.com', avatar: 'a.jpg', password: 'lucas123', status: "plata", ranking: 5600 })
        await Player.create({ nickname: 'fede', email: 'fede@gmail.com', avatar: 'a.jpg', password: 'fede123', status: "plata", ranking: 7000 })
        await Player.create({ nickname: 'gabi', email: 'gabi@gmail.com', avatar: 'a.jpg', password: 'gabi123', status: "bronce", ranking: 3400 })
        const player3ById = await Player.findByPk(3, { attributes: { exclude: ['password', 'admin', 'isactive'] } })
        const player4ById = await Player.findByPk(4, { attributes: { exclude: ['password', 'admin', 'isactive'] } })
        const response = await request(app)
            .get("/search")
            .set('Accept', 'application/json')
            .query({text:'or'})
        expect(response.status).to.eql(200);
        expect(response.body).to.eql({
            "players": [player3ById.dataValues, player4ById.dataValues],
            "totalPages": 1, "results": 2
        })
    })
    afterAll(async () => {
        await sequelize.sync({ force: true })
        await sequelize.close();
    });
})