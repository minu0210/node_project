const session = require('express-session')
const express = require('express')

module.exports = function (app) {
  app.set('trust proxy', 1)
  app.use(session({
      secret: 'v;ni#$!ni!@fvA{()IA@',
      cookie: { secure: false }
  }))
  app.use(express.json())
}