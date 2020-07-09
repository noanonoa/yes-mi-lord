require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const { get } = require('./auth');


/****************************
 ********** ROUTES **********
 ****************************/
//TEAMS PAGE
router.get('/', (req, res) => {
    db.team.findAll()
    .then(teams => {
        res.render('team', {
            teams
        })
    })
})

//TEAM DETAILS
router.get('/:name', (req, res) => {
    db.team.findOne({
        where: {
            name: req.params.name
        }
    })
    .then(team => {
        db.teammate.findAll({
            where: {
                teamId: team.id
            }
        })
        .then(teammates => {
            res.render('teammates', {
                teammates
            })
        })
    })
})

//CREATE A TEAM
router.post('/', (req, res) => {
    db.team.findOrCreate({
        where: {
            name: req.body.name
        },
        defaults: {
            name: req.body.name,
        }
    })
    .then(([team, created]) => {
//IF TEAM IS FOUND, FLASH A MESSAGE
        res.redirect('/team')
    })
})

router.post('/addTeammate', (req, res) => {
    db.teammate.findOrCreate({
        where: {
            name: req.body.name
        },
        defaults: {
            name: req.body.name,
            charId: req.body.charId,
            teamId: req.body.teamName
        }
    })
    .then(([teammate, created]) => {
        res.redirect('/team')
    })
})




module.exports = router;