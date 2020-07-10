require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const { get } = require('./auth');

// const paginate = require('express-paginate');
// router.use(paginate.middleware(100, 100));

/************************
 *** GLOBAL VARIABLES ***
 ************************/
const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const token = {headers: {
    "Authorization": `Bearer ${process.env.API_KEY}`
}}
const QUOTE_URL = 'https://the-one-api.herokuapp.com/v1/quote'
const CHARACTER_URL = 'https://the-one-api.herokuapp.com/v1/character'

/****************************
 ********** ROUTES **********
 ****************************/
//CHARACTERS PAGE
router.get('/', (req, res) => {

    axios.get(QUOTE_URL, token)
    .then(results => {
//FETCH character FOR ALL QUOTES IN THE TRILOGY
        let quotes = results.data.docs.map(element => {
            return element.character;
        })
        axios.get(CHARACTER_URL, token)

        .then(results => {
//COMPARE EACH CHARACTER._ID TO quotes ARRAY TO FILTER CHARACTERS FROM THE MOVIE
            let movieCharacters = results.data.docs.filter(element => {
                return quotes.includes(element._id)
            })

            res.render('characters', {
                characters: movieCharacters
            })
        })
    }).catch(err => console.log(err))
})

//CHARACTER DETAILS
router.get('/:id', (req, res) => {
    db.team.findAll({
        where: {
            userId: req.user.id
        },
        order: [
            ['id', 'ASC']
        ]
    })
    .then(teams => {
        let characterId = req.params.id
        axios.get(`${CHARACTER_URL}/${characterId}`, token)
        
        .then((results) => {
    //PASS CHARACTER INFORMATION & CHARACTER QUOTES
            let characterResponse = results.data
            axios.get(`${CHARACTER_URL}/${characterId}/quote`, token)
    
            .then((results) => {
                let characterQuotes = results.data.docs;
    //RANDOMIZE QUOTE FOR CHARACTER FLAVOR
                let randomQuote = characterQuotes[randomInt(0, characterQuotes.length - 1)].dialog;
    
                res.render('show', {
                    character: characterResponse,
                    randomQuote,
                    teams
                })
            })
        })
    }).catch(err => console.log(err))
})


module.exports = router;

