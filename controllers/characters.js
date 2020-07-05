const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const { get } = require('./auth');
require('dotenv').config()
const paginate = require('express-paginate');

router.use(paginate.middleware(100, 100));

router.get('/', (req, res) => {
    axios.get('https://the-one-api.herokuapp.com/v1/character', {
        headers: {
            "Authorization": `Bearer ${process.env.API_KEY}`
        }
    }).then((results) => {
        console.log('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥')
        // console.log(results);
        const itemCount = results.data.docs.length
        const resultsPerPage = 100;
        console.log(itemCount)
        const pageCount = Math.ceil(results.data.docs.length / resultsPerPage);
        console.log(req.query.page)

        res.render('characters', {
            characters: results.data.docs,
            pageCount,
            itemCount,
            resultsPerPage,
            pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
        })
    })
})



module.exports = router;