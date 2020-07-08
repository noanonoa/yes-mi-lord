require('dotenv').config()
const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const { get } = require('./auth');



router.get('/', (req, res) => {
    // db.teammate.findAll()

    res.render('team')
})







module.exports = router;