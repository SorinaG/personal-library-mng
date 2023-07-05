'use strict'

const config = require('../config')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected')
})

mongoose.connection.on('error', (err) => {
  console.log(`Could not connect to MongoDB because of ${err}`)
  process.exit(1)
})

if (config.env === 'dev') {
  mongoose.set('debug', true)
}

exports.connect = () => {
  var mongoURI = "mongodb+srv://sorinaUser:1234@sorinalibrary.eeooqbr.mongodb.net/test?retryWrites=true&w=majority"

  mongoose.connect(mongoURI, {
    useNewUrlParser: true
  })

  return mongoose.connection
}
