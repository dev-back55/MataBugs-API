import app from './app.js';
import { sequelize } from './database/db.js'
import './models/Player.js'
// for second commit
//setting
const PORT = process.env.PORT || 3000;

//Iniciamos Server
async function main() {
    try {
        await sequelize.sync({ force: false })
        app.listen(PORT, () => {
            console.log(`Server on port:${PORT}`)
        })
    } catch (error) {
        console.error('Unable to connect to the database', error)
    }
}
main()
