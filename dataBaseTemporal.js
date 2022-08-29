import Player from "./src/models/Player.js";
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

function asignarStatus(numero) {
  if (numero > 8000) return "oro";
  else if (numero > 5000) return "plata";
  else return "bronce";
}
function asignarRanking() {
  return Math.floor(Math.random() * 10000) + 1;
}
async function crearJugadores() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 12; j++) {
        let ranking = asignarRanking()
        let status = asignarStatus(ranking)
        await Player.create({nickname: (users[j] + i),ranking, status, avatar: avatars[j] })
    }
  }
}

crearJugadores()