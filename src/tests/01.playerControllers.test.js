import { expect } from 'chai';
import { signUp } from '../controllers/auth.controllers.js';
import { sequelize } from '../database/db.js';
import { deletePlayerById, getHallOfFame, getPlayerById, searchPlayers, updatePlayer } from './../controllers/players.controllers.js';
import Player from "../models/Player.js"


describe('-`signUp`-`getHallOfFame`-`getPlayerById`-`deletePlayerById`--`updatePlayer`', function () {
    beforeEach(async function () {
        await sequelize.sync({ force: true })
    })
    it('Inicialmente devuelve un arreglo de jugadores vacío', async function () {
        expect(await getHallOfFame()).to.eql([])
    })
    it('Agrega un jugador a la lista y devuelve un mensaje de confirmación. Trae todos los jugadores de la lista y comprueba que sea solo 1', async function () {
        const newPlayer = await signUp('enzoS', 'enzo2@gmail.com', 'a.jpg', 'enzo123')
        expect(newPlayer.msg).to.eql("player create successfully")
        expect(await getHallOfFame()).to.have.length(1)
    })
    it('Agrega un jugador a la lista, lo busca por id y comprueba su nickname. Por ultimo, lo elimina por id', async function () {
        const newPlayer = await signUp('enzoS', 'enzo2@gmail.com', 'a.jpg', 'enzo123')
        const getPlayer = await getPlayerById(newPlayer.player.id)
        expect(getPlayer.nickname).to.eql('enzoS')
        const deletePlayer = await deletePlayerById(getPlayer.id)
        expect(deletePlayer).to.eql(`The player was eliminated`)
    })
    it('Crea jugadores y los edita', async function () {
        await Player.create({ nickname: 'enzo', email: 'enzo@gmail.com', avatar: 'a.jpg', password: 'enzo123' })
        const nicknameUpdate = await updatePlayer(1, { nickname: 'enzosanchez', idCard: 1 })
        const player1 = await getPlayerById(1)
        expect(nicknameUpdate).to.eql('your profile has been successfully updated')
        expect(player1.nickname).to.eql('enzosanchez')
    })
    it('Crea jugadores, el primero Admin, este modifica a otro jugador y lo banea', async function () {
        await Player.create({ nickname: 'fede', email: 'fede@gmail.com', avatar: 'a.jpg', password: 'fede123', admin: true })
        await Player.create({ nickname: 'lucas', email: 'lucas@gmail.com', avatar: 'a.jpg', password: 'lucas123', status: "bronce" })
        const adminUpdatePlayer2 = await updatePlayer(1, { nickname: 'lucasB', avatar: 'b.jpg', isactive: false, idCard: 2 })
        expect(adminUpdatePlayer2).to.eql(`The player 2 has been updated`)
        const player2 = await getPlayerById(2)
        expect(player2.dataValues).to.eql({ "admin": false, "avatar": "b.jpg", "email": "lucas@gmail.com", "id": 2, "isactive": false, "nickname": "lucasB", "ranking": 0, "status": "bronce" })
    })
    });

describe(`SearchPlayers`, function () {
    beforeAll(async function () {
        await sequelize.sync({ force: true })
        await Player.create({ nickname: 'enzo', email: 'enzo@gmail.com', avatar: 'a.jpg', password: 'enzo123', status: "oro", ranking: 8500 })
        await Player.create({ nickname: 'horacio', email: 'horacio@gmail.com', avatar: 'a.jpg', password: 'lucas123', status: "plata", ranking: 5600 })
        await Player.create({ nickname: 'fede', email: 'fede@gmail.com', avatar: 'a.jpg', password: 'fede123', status: "plata", ranking: 7000 })
        await Player.create({ nickname: 'gabi', email: 'gabi@gmail.com', avatar: 'a.jpg', password: 'gabi123', status: "bronce", ranking: 3400 })
    })
    it('filtra jugadores por nickname y status al ingresar un texto, ordenado por ranking', async function () {
        const player1ById = await Player.findByPk(1, { attributes: { exclude: ['password', 'admin', 'isactive'] } })
        const player2ById = await Player.findByPk(2, { attributes: { exclude: ['password', 'admin', 'isactive'] } })
        let filter = await searchPlayers({ text: 'or' })
        expect(filter).to.eql({
            "players": [player1ById.dataValues, player2ById.dataValues],
            "totalPages": 1, "results": 2
        })
    })
    it('se puede ordenar por cualquier parametro en orden ascendente o descendente', async function () {
        const player1ById = await Player.findByPk(1, { attributes: { exclude: ['password', 'admin', 'isactive'] } })
        const player2ById = await Player.findByPk(2, { attributes: { exclude: ['password', 'admin', 'isactive'] } })
        let filter = await searchPlayers({ text: 'or', order: 'status,asc' })
        expect(filter).to.eql({
            "players": [player1ById.dataValues, player2ById.dataValues],
            "totalPages": 1, "results": 2
        })
    })
    it('se puede filtrar solo por status', async function () {
        const player3ById = await Player.findByPk(3, { attributes: { exclude: ['password', 'admin', 'isactive'] } })
        const player2ById = await Player.findByPk(2, { attributes: { exclude: ['password', 'admin', 'isactive'] } })
        let filter = await searchPlayers({ status: 'plata' })
        expect(filter).to.eql({
            "players": [player3ById.dataValues, player2ById.dataValues],
            "totalPages": 1, "results": 2
        })
    })
    it('se puede filtrar solo por status y nickname, ingresando ambos parametros', async function () {
        const player2ById = await Player.findByPk(2, { attributes: { exclude: ['password', 'admin', 'isactive'] } })
        let filter = await searchPlayers({ status: 'plata', text: 'horacio' })
        expect(filter).to.eql({
            "players": [player2ById.dataValues],
            "totalPages": 1, "results": 1
        })
    })
    it('envia hasta 10 jugadores por pagina', async function () {
        await Player.create({ nickname: 'enzo2', email: 'enzo2@gmail.com', avatar: 'a.jpg', password: 'enzo123', status: "oro", ranking: 8600 })
        await Player.create({ nickname: 'horacio2', email: 'horacio2@gmail.com', avatar: 'a.jpg', password: 'lucas123', status: "plata", ranking: 5700 })
        await Player.create({ nickname: 'fede2', email: 'fede2@gmail.com', avatar: 'a.jpg', password: 'fede123', status: "plata", ranking: 7100 })
        await Player.create({ nickname: 'gabi2', email: 'gabi2@gmail.com', avatar: 'a.jpg', password: 'gabi123', status: "bronce", ranking: 3500 })
        await Player.create({ nickname: 'enzo3', email: 'enzo3@gmail.com', avatar: 'a.jpg', password: 'enzo123', status: "oro", ranking: 8700 })
        await Player.create({ nickname: 'horacio3', email: 'horacio3@gmail.com', avatar: 'a.jpg', password: 'lucas123', status: "plata", ranking: 5800 })
        await Player.create({ nickname: 'fede3', email: 'fede3@gmail.com', avatar: 'a.jpg', password: 'fede123', status: "plata", ranking: 7200 })
        await Player.create({ nickname: 'gabi3', email: 'gabi3@gmail.com', avatar: 'a.jpg', password: 'gabi123', status: "bronce", ranking: 3600 })
        let filter = await searchPlayers()
        expect(filter.players.length).to.eql(10)
    })
    it('al haber 12 jugadores si se filtra la pagina 2, nos devolvera 2 players', async function () {
        let filter = await searchPlayers({ page: 2 })
        expect(filter.players.length).to.eql(2)
    })
    afterAll(async () => {
        await sequelize.sync({ force: true })
        await sequelize.close();
    });
});