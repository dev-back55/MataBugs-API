import request from "supertest";
import { expect } from 'chai';
import { sequelize } from '../database/db.js';
import app from '../app.js';

describe('GET inicialmente responde con un array vacío', function () {
    beforeEach(async function () {
            await sequelize.sync({ force: true })
      })
    it('GET inicialmente debe devolver un arreglo vacio',async function(){
      const response = await request(app)
            .get("/hallOfFame")
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/) // podemos testear los headers
          expect(response.status).to.eql(200);
          expect(response.body).to.eql([]) // testeamos la respuesta con el body
        })
    })