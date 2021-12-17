/**
 * Roteador para gerenciar autorizacoes. Eh linkado com a URL '/'.
 * o '/login' cuida do login e o '/restrito' cuida das permissoes
 */
const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.use('/restrito', (req, res, next) => {
    if ("user" in req.session) {
        return next()
    } else {
        res.redirect('/login')
    }
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ userName: req.body.userName })
    const isValid = await user.checkPassword(req.body.password)
    if (isValid) {
        req.session.user = user;
        res.redirect('/')
    } else {
        res.redirect('/login')
    }
})

module.exports = router;


