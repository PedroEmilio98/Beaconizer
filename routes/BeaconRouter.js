/**
 * Roteador para as paginas dos Beacon
 */

//importa as dependencias
const express = require('express');
const router = express.Router();
const beacon = require('../models/Beacon');

router.get('/', (req, res) => {
    res.send('funcionando')
});

module.exports = router;

