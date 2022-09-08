<p align='left'>
    <img src='https://res.cloudinary.com/djgghmpgh/image/upload/v1662586699/logo192_qoyg0i.png' style='width:150px;height:150px;'> </img>
</p>

# Bugs Hunters
## Introduction

Bugs Hunters is an App where you can access to see all the players, see the ranking of the best players, create a player and more, Bugs Hunters it is an RPG game where a group of players assumes the role of programmers of the new metaverse where they must destroy bugs, which in said virtual reality take the form of giant insects that devour space itself. As players progress, destroying more bugs and overcoming the challenges that will be imposed on them in the metaverse, they will earn more points, which will allow them to improve their equipment and increase their ranking.

## Project Objetives

- Build a React - Express - Postgres App 
- Implement services in AWS cloud. 
- Test implementation both in the Front (Cypress) and in the back (Jest).
- Use Scrum agile methodology.

## Stack of Technologies

### Front End:
- HTML, CSS, Javascript, React, Redux, SendGrid, Cloudinary, SASS 
- Deploy: AWS(EC2 - ngnix)

### Back End:
- Node.js, Express, Sequelize, Passport
- Deploy: AWS(EC2 - RDS) - PM2

### Database:
- PostgreSQL - AWS(RDS)

### Development Interface:
- Visual Studio Code

## **Starting Instructions** 

__IMPORTANT:__ Necesary version of node and NPM 

 * __Node__: 16.15.1 or higher
 * __NPM__: 8.11.0 or higher
 
## BoilerPlate

The boilerPlate has two folders: `api` and `client`.
You can find the first folder `MataBugs-client` in this repo (https://github.com/dev-back55/MataBugs-client) and the second folder in the same repo like `MataBugs-api` in this same github.

Inside `api` you must have to create a file called: `.env` 
that has the following form: 

```

DB_USER=postgres
DB_PASSWORD=12345
DB_HOST=localhost
DB_DIALECT=postgres
PORT=3000
CLIENT_URL=http://15.229.74.105:3000

** Auth Config: **
SENDGRID_API_KEY=**********

```

You have to replace `DB_USER` and `DB_PASSWORD` with your own credentials to connect to postgres database. This file will be ignored by github, as it contains sensitive information (the credentials).

In Auth Config you must generated your own SendGrid credential to use this functionalities.

## Next 
### _Connect the data base_

 - Go to your postgres database manager and create a new  database called `halloffame`, this is the name of the database to which we will connect.

### _Install the necesary package to run it_

- Open the project console
    + Inside `MataBugs-api` folder, run the command line, `npm install`
    + Inside `MataBugs-client` folder, run the command line, `npm install` 

### _Run the project_

- Open the project console
    + Inside `MataBugs-api` folder, run the command line, `npm start`
    + Inside `MataBugs-api` folder, run the command line, `node dataBaseTemporal.js` to create standard users with theirs avatars in local environments.
        
    + Inside `MataBugs-client` folder, run the command line, `npm start` and then (go to http://localhost:3000/).

# For testing

- You can find in `api/src/index.js`
    + `conn.sync({ force: false })`, switch it between " true " ( if you want reset database in each loaded ) or " false "( if you dont want reset database in each loaded ) 

- Inside `MataBugs-api` folder, run the command line, `npm run test 'Number of test'` (Ej.: npm run test 01) to run each api's test. Run individual API test to ensure successful verification.

- Inside `MataBugs-client` folder, run the command line, `npm run test` to run each client's test. This test will open a new browser window where you need to select which test you want to test. This test check the localhost App with api deployed. It is possible to execute the tests on the deployed app by changing the base url in `MataBugs-client/cypress.config.js`.

# Deploy Project 

Live Front End Proyect Bugs Hunters: http://15.229.74.105
- You can create a standard user to see all funcionality or use this user like admin to see admin funcionality:
    + email: gabrielpitrella@gmail.com
    + password: 123456

Live Back End Proyect Bugs Hunters: http://15.229.74.105:3000

# Developers

- Federico Romero
    + Linkedin: https://www.linkedin.com/in/federico-romero-fullstack
    + Github: https://github.com/RomeroFederico
    + email: romerof14@gmail.com

- Enzo Sanchez
    + Linkedin: https://www.linkedin.com/in/enzo-sanchez-733b85165/
    + Github: https://github.com/Enzos97
    + email: enz997.ing.ind@gmail.com

- Lucas Battaglia
    + Linkedin: https://www.linkedin.com/in/battaglialucas/
    + Github: https://github.com/battaglialucas
    + email: lucassebastianbattaglia@gmail.com     

- Horacio Abitu
    + Linkedin: https://www.linkedin.com/in/horacioabitu/
    + Github: https://github.com/dev-back55
    + email: ahabitu@gmail.com

- Gabriel Pitrella
    + Linkedin: https://www.linkedin.com/in/gabrielpitrella
    + Github: https://github.com/gpitrella
    + email: gabrielpitrella@gmail.com

# Project Screens 

- Charging Page
![ChargingPage](https://res.cloudinary.com/djgghmpgh/image/upload/v1662477282/HallOfFameInitial_kesfiu.jpg)

- Home Page 
![HomePage](https://res.cloudinary.com/djgghmpgh/image/upload/v1662477119/HallOfFame_ai7rks.jpg)

- Search Player Page
![SearchPlayer](https://res.cloudinary.com/djgghmpgh/image/upload/v1662477287/HallOfFameSearch_hr4nog.jpg)

- Details Player Page
![DetailsPlayer](https://res.cloudinary.com/djgghmpgh/image/upload/v1662477284/HallOfFamePlayerDetail_ilrpoq.jpg)

- Create Player Page
![CreatePlayer](https://res.cloudinary.com/djgghmpgh/image/upload/v1662477282/HallOfFameCreatePlayer_vz4xob.jpg)

- About Page
![About](https://res.cloudinary.com/djgghmpgh/image/upload/v1662477285/HallOfFameAbout_k3ir5q.jpg)

- Login Page
![About](https://res.cloudinary.com/djgghmpgh/image/upload/v1662478479/HallOfFameSignIn_ivfelo.jpg)
