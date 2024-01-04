const session = require('express-session')
const express = require('express')
const methodOverride = require('method-override')

module.exports = function (app) {
    app.set('trust proxy', 1)
    app.use(session({
        secret: 'v;ni#$!ni!@fvA{()IA@',
        cookie: { secure: false }
    }))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('static'))
    app.use(methodOverride('_method'))
}