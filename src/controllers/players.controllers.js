import { Op } from "sequelize";
import Player from "../models/Player.js"
import { hashSync } from 'bcrypt';
import { rounds } from '../auth.js';

export async function getHallOfFame() {
  let betterPlayers = await Player.findAll({ order: [["ranking", "desc"]] });
  return betterPlayers;
}

export async function searchPlayers(data) {
  let { page, text, status, order } = data;
  let conditions = { distinct: true, order: [["ranking", "desc"]] };

  let size = 10;
  page = page > 1 ? Number.parseInt(page) - 1 : 0;
  conditions.limit = size;
  conditions.offset = page * size;

  let playerById = await getPlayerById(text);
  if (playerById) return { players: playerById, totalPages: 1, results: 1 };

  if (order) { order = order.split(","); conditions.order = [[order[0], order[1]]] }
  console.log("aca estoy")
  if (["oro", "plata", "bronce"].includes(status) && text) conditions.where = { [Op.and]: [{ status: { [Op.eq]: status }, nickname: { [Op.like]: `%${text}%` } }] }, console.log("entre1")
  else if (text) conditions.where = { [Op.or]: [{ status: { [Op.like]: `%${text}%` } }, { nickname: { [Op.like]: `%${text}%` } }] }, console.log("entre2")
  else if (["oro", "plata", "bronce"].includes(status)) conditions.where = { status: status }, console.log("entre3")

  let playersSearched = await Player.findAndCountAll(conditions)

  return {
    players: playersSearched.rows,
    totalPages: Math.ceil(playersSearched.count / size),
    results: playersSearched.count,
  }
}

export async function createPlayer(data) {
  let { nickname, email, avatar, password } = data;
  console.log(password)
  let hpassword = hashSync(password, Number.parseInt(rounds));
  console.log(hpassword)
  const findInDb = await Player.findOne({ where: { email } })
  if (!findInDb) {
    await Player.create({ nickname, email, avatar, password: hpassword, status: "bronce" });
    return `the player ${nickname} was created successfully`;
  } else {
    throw new Error ('There is already a player with this email')
  }
}

export async function updatePlayer(id,data) {
  let {idCard} = data
  let findUserById = await getPlayerById(id)
  if(findUserById.admin){
    if(id==idCard){
      await Player.update(data, { where: { id} })
      return 'your profile has been successfully updated'
    }else{
      await Player.update(data, { where: { id:idCard } });
      return `The player ${idCard} has been updated`
    }
  }else{
    if(id==idCard){
      await Player.update(data, { where: { id} })
      return 'your profile has been successfully updated'
    }
    return `your user does not have admin rights`;
  }
}

export async function getPlayerById(id) {
  if (!/^[1-9][0-9]*$/.test(id)) return false;
  let playerById = await Player.findByPk(id)
    //  ,{attributes: { exclude: ['password'] }} --------- esto deberia ir en la linea de arriba (74), funciona OK pero rompe los test. Mañana les cuento.
  if (!playerById) return false;
  return playerById;
}

export async function deletePlayerById(id) {
  if (!/^[1-9][0-9]*$/.test(id)) return false;
  await Player.destroy({ where: { id } })
  return `The player was eliminated`
}