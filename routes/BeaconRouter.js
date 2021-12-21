/**
 * Roteador para as paginas dos Beacon
 */

//importa as dependencias
const express = require('express');
const router = express.Router();
const beacon = require('../models/Beacon');

router.get('/', async (req, res) => {
    const beaconPublic = await beacon.find({ category: 'public' });
    res.render('beacon/index', { beacon: beaconPublic })
});

module.exports = router;

