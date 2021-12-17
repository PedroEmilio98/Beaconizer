/**
 * Router para gerenciar as paginas estaticas. Eh linkado a URL '/';
 */

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('index')
})

module.exports = router