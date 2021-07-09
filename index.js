const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('tiny'));
const cors = require('cors');
app.use(cors());
const mongoose = require("mongoose");
const db = require("./database")

app.set('puerto', 3001 || 3000);//process.env.PORT
app.listen(app.get('puerto'), function () {
  console.log('Example app listening on port '+ app.get('puerto'));
});

app.use(express.json());

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const mongoUrl = db.db
//const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(
  () => {
    console.log("Me he conectado ...a la base de datos");
  },
  (err) => {
    console.log(err);
  }
);

const routesAnimal = require('./routes/animal')
const routesParticipant = require('./routes/participant')
const routesRace = require('./routes/race')
const routesCategory = require('./routes/category')
const routesSubcategory = require('./routes/subcategory')
const routesTeam = require('./routes/team')
const routesFunctions = require('./routes/functions')
const routesCompetitions = require('./routes/competencias')
const routesBd = require('./routes/bd')
const results = require('./routes/results')
const routesAsociation = require('./routes/asociations')
const routesTeamEx = require('./routes/team_ex')
const routesAnimalEx = require('./routes/animal_ex')
const routesCompetitionsEx = require('./routes/competenciasEx')
const routesResultsEx = require('./routes/resultsEx')
const routesAnimalAll = require('./routes/animal_all')
const routesAnimalMilk = require('./routes/animal_milk')
app.use('/api/animal', routesAnimal)
app.use('/api/participant', routesParticipant)
app.use('/api/race', routesRace)
app.use('/api/category', routesCategory)
app.use('/api/subcategory', routesSubcategory)
app.use('/api/teams', routesTeam)
app.use('/api/functions', routesFunctions)
app.use('/api/competitions', routesCompetitions)
app.use('/api/bd', routesBd)
app.use('/api/results', results)
app.use('/api/asociations', routesAsociation)
app.use('/api/teamsEx', routesTeamEx)
app.use('/api/animalEx', routesAnimalEx)
app.use('/api/competitionsEx', routesCompetitionsEx)
app.use('/api/resultsEx', routesResultsEx)
app.use('/api/animalAll', routesAnimalAll)
app.use('/api/animalMilk', routesAnimalMilk)
