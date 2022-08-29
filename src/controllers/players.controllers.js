import Op from "sequelize";
import Player from "../models/Player.js"

export async function getHallOfFame() {
  let betterPlayers = await Player.findAll({ order: ["ranking", "desc"], limit : 10});
  return betterPlayers;
}

export async function searchPlayers(data) {
  let { page, text, status, order } = data;
  let conditions = { distinct: true, order: ["ranking", "desc"] };

  size = 10;
  page = page > 1 ? Number.parseInt(page) - 1 : 0;
  conditions.limit = size;
  conditions.offset = page * size;

  let playerById = await getPlayerById(text);
  if (playerById) return { players: playerById, totalPages: 1, results: 1 };

  if (order) conditions.order[1] = order;

  if (["oro", "plata", "bronce"].includes(status) && text)conditions.where ={[Op.and]:[{status:status},{nickname:{[Op.like]:`%${text}%`}}]}
  else if (text) conditions.where = {[Op.or]:[{status:{[Op.like]:`%${text}%`}},{nickname:{[Op.like]:`%${text}%`}}]}
  else if (["oro", "plata", "bronce"].includes(status)) conditions.where = {status:status}

  let playersSearched = await Player.findAndCountAll(conditions);
  playersSearched = {
    players: playersSearched.rows,
    totalPages: Math.ceil(playersSearched.count / size),
    results: playersSearched.count,
  };

  return playersSearched;
}

export async function createPlayer(data) {
  let { nickname, avatar } = data;
  await Player.create({ nickname, avatar });
  return `the player ${nickname} was created successfully`;
}

export async function updatePlayer(data) {
  let playerUpdated = await Player.update(data, { where: { id } });
  return `the player ${playerUpdated.dataValues.nickname} was updated successfully`;
}

export async function getPlayerById(id) {
  if (!/^[1-9][0-9]*$/.test(id)) return false;
  let playerById = await Player.findByPk(id);
  if (!playerById) return false;
  return playerById;
}

export async function deletePlayerById(id){
    if (!/^[1-9][0-9]*$/.test(id)) return false;
    await Player.destroy({where:{id}})
    return `The player was eliminated`
}