const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('tiny'));
const cors = require('cors');
app.use(cors());
const mongoose = require("mongoose");
const db = require("./database")

app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function () {
  console.log('Example app listening on port '+ app.get('puerto'));
});

app.use(express.json());

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const mongoUrl = db.db
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


app.use('/api/animal', routesAnimal)
app.use('/api/participant', routesParticipant)
app.use('/api/race', routesRace)
app.use('/api/category', routesCategory)
app.use('/api/subcategory', routesSubcategory)
