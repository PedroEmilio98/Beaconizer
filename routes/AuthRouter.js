/**
 * Roteador para gerenciar autorizacoes. Eh linkado com a URL '/'.
 * o '/login' cuida do login e o '/restrito' cuida das permissoes
 */
const express = require('express');
const router = express.Router();
const User = require('../models/User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(new LocalStrategy({ usernameField: 'userName' }, async (userName, password, done) => {
    const user = await User.findOne({ userName })
    if (user) {
        const isValid = await user.checkPassword(password)
        if (isValid) {
            return done(null, user)
        } else {
            return done(null, user)
        }
    } else {
        return done(null, false)
    }
}
))

router.use((req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next()
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
})

router.use('/restrito', (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect('/login')
    }
});

module.exports = router;


