import { Op } from "sequelize";
import Player from "../models/Player.js"
import { hashSync } from 'bcrypt';
import { rounds } from '../auth.js';


export async function getHallOfFame() {
  let betterPlayers = await Player.findAll({ order: [["ranking", "desc"]], limit : 10,attributes: { exclude: ['password','admin','isactive'] }});
  return betterPlayers;
}

export async function createPlayer(data) {
  let { nickname, email, avatar, password, admin } = data;

  const findInDb = await Player.findOne({ where: { email } })
  if (findInDb) throw new Error ('There is already a player with this email')

  let hpassword = hashSync(password, Number.parseInt(rounds));
  await Player.create({ nickname, email, avatar, admin, password: hpassword, status: "bronce" });
  
  return `the player ${nickname} was created successfully`;

}

export async function updatePlayer(id,data) {
  let {idCard} = data
  let userById = await getPlayerById(id)

  if(!userById.admin && id != idCard) throw new Error ('you do not have the permissions to perform this action')
  if(id == idCard) {let {avatar, nickname} = data; data = {avatar, nickname}}
  await Player.update(data, { where: { id:idCard } })

  return id==idCard ? ('your profile has been successfully updated') :
  (`The player ${idCard} has been updated`)
}

export async function getPlayerById(id) {
  if (!/^[1-9][0-9]*$/.test(id)) return false;
  let playerById = await Player.findByPk(id,{attributes: { exclude: ['password'] }})
  if (!playerById) return false;
  return playerById;
}

export async function deletePlayerById(id) {
  if (!/^[1-9][0-9]*$/.test(id)) return false;
  await Player.destroy({ where: { id } })
  return `The player was eliminated`
}

 function itIsAInvalidStatus(possibleStatus){
  return !["oro", "plata", "bronce"].includes(possibleStatus)
}

export async function searchPlayers(data) {
  let { page, text, status, order } = data;

  let playerById = await getPlayerById(text);
  if (playerById) return { players: playerById, totalPages: 1, results: 1 };

  let size = 10;
  page = page > 1 ? Number.parseInt(page) - 1 : 0;
  
  if(itIsAInvalidStatus(status)) status = null
  let queryParameters = setQueryParameters(size, page, order, status, text)
  
  let playersSearched = await Player.findAndCountAll(queryParameters)

  return {
    players: playersSearched.rows,
    totalPages: Math.ceil(playersSearched.count / size),
    results: playersSearched.count,
  }
}

function setQueryParameters(size, page, order, status, text){
  if(order) {let auxOrder = order.split(","); order = [[auxOrder[0], auxOrder[1]]]}
  else order  = [['ranking','desc']]

  return {distinct:true, offset : page * size, order, limit: size,
  attributes:{exclude:['password','admin','isactive']}, where : setFilters(status, text)}
}

function setFilters(status, text) {
  let filters ={[Op.and]:[{admin:{[Op.eq]:false},isactive:{[Op.eq]:true}}]}

  let equalStatus = {[Op.eq]:status}
  let includedInStatus = {[Op.like]:`%${text}%`}
  let includedInNickname = {[Op.like]:`%${text}%`}

  if(status && text) filters[Op.and][0].status = equalStatus, filters[Op.and][0].nickname = includedInNickname
  else if(text) filters[Op.and][0][Op.or] = [{status:includedInStatus},{nickname:includedInNickname}]
  else if(status) filters[Op.and][0].status = equalStatus
  
  return filters
}