/**
 * Roteador para gerenciar autorizacoes. Eh linkado com a URL '/'.
 * o '/login' cuida do login e o '/restrito' cuida das permissoes
 */
const express = require('express');
const router = express.Router();
const User = require('../models/User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

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
));

passport.use(new GoogleStrategy({
    clientID: '690270204811-7tfsqblbqnv2utp2bg1cc01blmh4djh2.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/google/callback',
}, async (acessToken, refreshToken, err, profile, done) => {
    const userDB = await User.findOne({ googleId: profile.id })
    if (!userDB) {
        const user = new User({
            name: profile.displayName,
            googleId: profile.id,
            category: 'null',
            roles: 'none'
        })
        await user.save()
        done(null, user)
    } else {
        done(null, userDB)
    }
}))



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

router.get('/google', passport.authenticate('google',
    { scope: ['https://www.googleapis.com/auth/userinfo.profile'] }));
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/'
    }))

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


