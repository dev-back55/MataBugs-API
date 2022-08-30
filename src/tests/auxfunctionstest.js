import Player from "../models/Player.js"

export const resetDB = async ()=>{
    await Player.destroy({
        where:{}})
    return `All Player's DB`
}

