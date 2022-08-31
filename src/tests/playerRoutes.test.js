import supertest from "supertest";
import { expect } from 'chai';
import { sequelize } from '../database/db.js';
import express from "express";
const request = supertest('http://localhost:3001');
describe('GET inicialmente responde con un array vacío', function () {
    beforeEach(async function () {
            await sequelize.sync({ force: true })
      })
    it('GET inicialmente debe devolver un arreglo vacio',async function(){
        const response = await request
            .get("/hallOfFame")
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/) // podemos testear los headers
          expect(response.body).to.eql([]) // testeamos la respuesta con el body
        })
    })