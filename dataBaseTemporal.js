import Player from "./src/models/Player.js";
import { faker } from '@faker-js/faker';
import multiavatar from '@multiavatar/multiavatar/esm'
import { rounds } from './src/auth.js';
import { hashSync } from 'bcrypt';
import{ avatares }from './avatares.js'

const users = ["lucas", "horacio", "enzo", "gabriel", "federico", "agustin", "matias", "pedro", "juan cruz", "eduardo", "diego", "lionel"];

const avatars = ["https://drive.google.com/thumbnail?id=1FvgHhPmYNwruvKSjok1dp-ikpKVD2O5z",
"https://drive.google.com/thumbnail?id=17fBzEwLjVC4wbHBi1O64PA-D-i8G_Z4b",
"https://drive.google.com/thumbnail?id=1Wuh2EYq9-txwdlUqVt82zm9egwXCMlhh",
"https://drive.google.com/thumbnail?id=1fpl6FOG7Gi-X4oHH-dAm3b0UGDYJE9Jr",
"https://drive.google.com/thumbnail?id=1MxwSwrdTZaQyufL830XhOnM_Me1_q3_h",
"https://drive.google.com/thumbnail?id=1wy_udY0W2rebTfKDYVClfAbWewWqfzmd",
"https://drive.google.com/thumbnail?id=1XAO68EZU0CfytEmqr5OYaPkP52RRewd6",
"https://drive.google.com/thumbnail?id=1TUfAaVfZgGee0UKQK8bxJziDKc31Xdet",
"https://drive.google.com/thumbnail?id=16wM4CZgYPCCiGmHxLmMbAXG7BkBcybH-",
"https://drive.google.com/thumbnail?id=1N_68Jhs4pM3i8Njj3teLdaOVRu9KQHbK",
"https://drive.google.com/thumbnail?id=1ZhFz6JMOtT3107w-z2KuO0PZMOKEzIYx",
"https://drive.google.com/thumbnail?id=1gqJ8yhqsmyQ5sJcLIFGt-DmN_5mDyBu-"]

export const avatares = [
    "https://cdn-icons-png.flaticon.com/512/4825/4825015.png",
    "https://cdn-icons-png.flaticon.com/256/4825/4825112.png",
    "https://cdn-icons-png.flaticon.com/256/4825/4825038.png",
    "https://cdn-icons-png.flaticon.com/256/4825/4825087.png",
    "https://cdn-icons-png.flaticon.com/256/4481/4481293.png",
    "https://cdn-icons-png.flaticon.com/256/4825/4825082.png",
    "https://cdn-icons-png.flaticon.com/256/4481/4481273.png",
    "https://cdn-icons-png.flaticon.com/256/5149/5149059.png",
    "https://cdn-icons-png.flaticon.com/256/4729/4729629.png",
    "https://cdn-icons-png.flaticon.com/256/4825/4825027.png",
    "https://cdn-icons-png.flaticon.com/256/4105/4105448.png",
    "https://cdn-icons-png.flaticon.com/256/4392/4392506.png",
    "https://cdn-icons-png.flaticon.com/256/7154/7154022.png",
    "https://cdn-icons-png.flaticon.com/256/4105/4105456.png",
    "https://cdn-icons-png.flaticon.com/256/5046/5046929.png",
    "https://cdn-icons-png.flaticon.com/256/4522/4522559.png",
    "https://cdn-icons-png.flaticon.com/256/4105/4105458.png",
    "https://cdn-icons-png.flaticon.com/256/4105/4105459.png",
    "https://cdn-icons-png.flaticon.com/256/4105/4105450.png",
    "https://cdn-icons-png.flaticon.com/256/4105/4105444.png",
    "https://cdn-icons-png.flaticon.com/256/5046/5046943.png",
    "https://cdn-icons-png.flaticon.com/256/4729/4729574.png",
    "https://cdn-icons-png.flaticon.com/256/4729/4729561.png",
    "https://cdn-icons-png.flaticon.com/256/4471/4471115.png",
    "https://cdn-icons-png.flaticon.com/256/5046/5046928.png",
    "https://cdn-icons-png.flaticon.com/256/5266/5266961.png",
    "https://cdn-icons-png.flaticon.com/256/4729/4729602.png",
    "https://cdn-icons-png.flaticon.com/256/7603/7603127.png",
    "https://cdn-icons-png.flaticon.com/256/6348/6348084.png",
    "https://cdn-icons-png.flaticon.com/256/4577/4577512.png",
    "https://cdn-icons-png.flaticon.com/256/4729/4729675.png",
    "https://cdn-icons-png.flaticon.com/256/5345/5345475.png",
    "https://cdn-icons-png.flaticon.com/256/8060/8060613.png",
    "https://cdn-icons-png.flaticon.com/256/4433/4433180.png",
    "https://cdn-icons-png.flaticon.com/256/4433/4433180.png",
    "https://cdn-icons-png.flaticon.com/256/4729/4729687.png",
    "https://cdn-icons-png.flaticon.com/256/4360/4360098.png",
    "https://cdn-icons-png.flaticon.com/256/4729/4729645.png",
    "https://cdn-icons-png.flaticon.com/256/7592/7592252.png",
    "https://cdn-icons-png.flaticon.com/256/5050/5050410.png"
]

function asignarStatus(numero) {
  if (numero > 8000) return "oro";
  else if (numero > 5000) return "plata";
  else return "bronce";
}
function asignarRanking() {
  return Math.floor(Math.random() * 10000) + 1;
}
export async function crearJugadores() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 12; j++) {
        let ranking = asignarRanking()
        let status = asignarStatus(ranking)
        await Player.create({nickname: (users[j] + i),ranking, status, avatar: avatars[j] })
    }
  }
}

let cantidadDeUsuarios = 50
export async function crearJugadoresParaDb() {
  let players = []
  for (let j = 0; j < cantidadDeUsuarios; j++) {
      let ranking = asignarRanking()
      let status = asignarStatus(ranking)
      let nickname = faker.name.firstName()
      let email = faker.internet.email()
      let passwordWithoutHash = faker.internet.password()
      let password = hashSync(passwordWithoutHash, Number.parseInt(rounds));
      let avatar = avatares[Math.floor(Math.random() * avatares.length)];
      players.push({ nickname ,ranking, status, avatar, email, password })
  }
  await Player.bulkCreate(players)
  console.log("sobreviví")
}

crearJugadoresParaDb()