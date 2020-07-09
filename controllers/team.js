require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const { get } = require('./auth');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

/****************************
 ********** ROUTES **********
 ****************************/
//TEAMS PAGE
router.get('/', (req, res) => {
    db.team.findAll({
        order: [
            ['id', 'ASC']
        ]
    }
    )
    .then(teams => {
        res.render('team', {
            teams
        })
    })
})

//TEAM DETAILS
router.get('/:name', (req, res) => {
//FIND A TEAM BY ITS NAME
    db.team.findOne({
        where: {
            name: req.params.name
        }
    })
    .then(team => {
//LIST ALL TEAMMATES BY TEAM'S ID
        db.teammate.findAll({
            where: {
                teamId: team.id
            }
        })
        .then(teammates => {
            res.render('teammates', {
                teammates,
                team
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

//ADD TEAMMATE WITH SPECIFIC TEAM ID
router.post('/addTeammate', (req, res) => {
    db.teammate.findOrCreate({
        where: {
            name: req.body.name,
            teamId: req.body.teamList
        },
        defaults: {
            name: req.body.name,
            charId: req.body.charId,
            teamId: req.body.teamList
        }
    })
    .then(([teammate, created]) => {
        res.redirect('/team')
    })
})

//UPDATE COMMENT ATTRIBUTE FOR TEAM DB
router.put('/:name', (req, res) => {
    db.team.update({
        comment: req.body.teamDescription
    },
    {
        where: {
            name: req.params.name
        }
    })
    .then(([results, updated]) => {
        res.redirect(`/team/${req.params.name}`)
    })
})

//DELETE TEAM
router.delete('/:name', (req, res) => {
    db.team.destroy({
        where: {
            name: req.params.name
        }
    })
    .then(
        res.redirect('/team')
    )
})


module.exports = router;