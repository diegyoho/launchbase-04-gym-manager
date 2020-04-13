const express = require('express')
const routes = express.Router()

routes.get('/', function (req, res) {
    res.redirect('/instructors')
})

routes.get('/instructors', function (req, res) {
    res.render('instructors/index')
})

routes.get('/members', function (req, res) {
    res.render('members/index')
})

module.exports = routes