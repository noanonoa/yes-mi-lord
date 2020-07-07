const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const { get } = require('./auth');
require('dotenv').config()
const paginate = require('express-paginate');

router.use(paginate.middleware(100, 100));

const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const token = {headers: {
    "Authorization": `Bearer ${process.env.API_KEY}`
}}

router.get('/', (req, res) => {
    axios.get('https://the-one-api.herokuapp.com/v1/character', token)
    
    .then((results) => {
        
        res.render('characters', {
            characters: results.data.docs
        })
    })
})

router.get('/:id', (req, res) => {
    let characterId = req.params.id
    axios.get('https://the-one-api.herokuapp.com/v1/character/' + characterId, token)
    
    .then((results) => {
        let characterResponse = results.data
        axios.get(`https://the-one-api.herokuapp.com/v1/character/${characterId}/quote`, token)

        .then((results) => {
            let characterQuotes = results.data.docs;
            randomQuote = characterQuotes[randomInt(0, characterQuotes.length - 1)].dialog;


            res.render('show', {
                character: characterResponse,
                randomQuote,
            })
        })
    }).catch(err => console.log(err))

})


module.exports = router;

