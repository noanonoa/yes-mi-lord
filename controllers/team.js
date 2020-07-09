require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const { get } = require('./auth');



router.get('/', (req, res) => {
    db.teammate.findAll()
    .then(teammates => {
        res.render('team', {
            teammates
        })
    })
})

router.post('/', (req, res) => {
    db.teammate.findOrCreate({
        where: {
            charId: req.body.charId
        },
        defaults: {
            name: req.body.name,
            charId: req.body.charId
        }
    })
    .then(([teammate, created]) => {
        res.redirect('/team')
    })
})





module.exports = router;