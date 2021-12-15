/**
 * Roteador para as areas restritas
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('area restrita')
});
router.get('/avisos', (req, res) => {
    res.send('avisos restritos')
});

module.exports = router