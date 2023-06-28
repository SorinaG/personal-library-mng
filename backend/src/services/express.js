const express = require("express");
const router = require("../routes/index.js");
const bodyParser = require("body-parser");
const passport = require('passport')
const helmet = require('helmet')
const cors = require('cors')
const { ValidationError } = require('express-validation')
const passportJwt = require('./passport')
const errorHandler = require('../middlewares/error-handler.js')

// async function main() {
//   await mongoose.connect(
//     "mongodb+srv://negreasorina:iFfFaurIhNAR2Pzs@sorinalibrary.eeooqbr.mongodb.net/?retryWrites=true&w=majority"
//   );
// }

// main().catch((err) => console.log(err));

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();
app.use(helmet())

app.use(cors())

app.use("/", jsonParser, router);

app.use(errorHandler.handleError)
app.use(errorHandler.handleNotFound)

app.use(passport.initialize())
passport.use('jwt', passportJwt.jwt)

app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});

// app.listen(3000, () => console.log("Application started"));

exports.start = () => {
    app.listen(3000, (err) => {
      if (err) {
        console.log(`Error : ${err}`)
        process.exit(-1)
      }
  
      console.log(`Application is running on 3000`)
    })
  }
  
  exports.app = app
