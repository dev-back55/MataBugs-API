import { Op } from "sequelize";
import Player from "../models/Player.js"
import { hashSync } from 'bcrypt';
import { rounds } from '../auth.js';

 function itIsAValidStatus(possibleStatus){
  return ["oro", "plata", "bronce"].includes(possibleStatus)
}

export async function getHallOfFame() {
  let betterPlayers = await Player.findAll({ order: [["ranking", "desc"]], limit : 10,attributes: { exclude: ['password','admin','isactive'] }});
  return betterPlayers;
}

export async function searchPlayers(data) {
  let { page, text, status, order } = data;
  let conditions = {distinct:true,
  order:[['ranking','desc']],
  attributes:{exclude:['password','admin','isactive']},
  where:{[Op.and]:[{admin:{[Op.eq]:false},isActive:{[Op.eq]:true}}]}}

  let size = 10;
  page = page > 1 ? Number.parseInt(page) - 1 : 0;
  conditions.limit = size;
  conditions.offset = page * size;
  // sin admins ni baneados
  let playerById = await getPlayerById(text);
  if (playerById) return { players: playerById, totalPages: 1, results: 1 };

  if (order) { order = order.split(","); conditions.order = [[order[0], order[1]]]}
  conditions.where[Op.and][0][Op.or] = [{status:{[Op.like]:`%${text}%`}},{nickname:{[Op.like]:`%${text}%`}}]
  console.log(conditions.where[Op.and])
  return conditions
  // if (itIsAValidStatus(status) && text)conditions.where ={[Op.and]:[{status:{[Op.eq]:status},nickname:{[Op.like]:`%${text}%`}}]}
  // else if (text) conditions.where = {[Op.or]:[{status:{[Op.like]:`%${text}%`}},{nickname:{[Op.like]:`%${text}%`}}]}
  // else if (itIsAValidStatus(status)) conditions.where = {status:status}

  
  // let playersSearched = await Player.findAndCountAll(conditions)

  // return {
  //   players: playersSearched.rows,
  //   totalPages: Math.ceil(playersSearched.count / size),
  //   results: playersSearched.count,
  // }
}

export async function createPlayer(data) {
  let { nickname, email, avatar, password } = data;

  const findInDb = await Player.findOne({ where: { email } })
  if (!findInDb) throw new Error ('There is already a player with this email')

  let hpassword = hashSync(password, Number.parseInt(rounds));
  await Player.create({ nickname, email, avatar, password: hpassword, status: "bronce" });
  
  return `the player ${nickname} was created successfully`;

}

export async function updatePlayer(id,data) {
  // hay que modificar el update
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
  let playerById = await Player.findByPk(id,{attributes: { exclude: ['password'] }})
  if (!playerById) return false;
  return playerById;
}

export async function deletePlayerById(id) {
  if (!/^[1-9][0-9]*$/.test(id)) return false;
  await Player.destroy({ where: { id } })
  return `The player was eliminated`
}