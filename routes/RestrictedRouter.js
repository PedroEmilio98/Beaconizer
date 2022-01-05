/**
 * Roteador para as areas restritas. Todos partem da URL '/restrito'
 */

const express = require('express');
const router = express.Router();

const Beacon = require('../models/Beacon');

router.get('/', (req, res) => {
    console.log(res.locals)
    res.send('area restrita')
});
router.get('/avisos', async (req, res) => {
    const beaconRestricted = await Beacon.find({ category: req.session.passport.user.category })
    res.render('beacon/restrict', { beacon: beaconRestricted })
});

module.exports = router