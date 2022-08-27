import '../models/Player.js' // no se que carajos hacer para que funcioneeee
import { Op } from "sequelize";

export const getHallOfFame = async function () {
  let betterPlayers = await Player.findAll({ order: ["ranking", "desc"], limit : 10});
  return "betterPlayers";
}

export const searchPlayers = async function (data) {
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

export const createPlayer = async function (data) {
  let { nickname, avatar } = data;
  await Player.create({ nickname, avatar });
  return `the player ${nickname} was created successfully`;
}

export const updatePlayer = async function (data) {
  let playerUpdated = await Player.update(data, { where: { id } });
  return `the player ${playerUpdated.dataValues.nickname} was updated successfully`;
}

async function getPlayerById(id) {
  if (!/^[1-9][0-9]*$/.test(id)) return false;
  let playerById = await Player.findByPk(id);
  if (!playerById) return false;
  return playerById;
}
