const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('./models/user'); // Modèle utilisateur MongoDB
const bcrypt = require('bcrypt');
const app = express();


app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/my-database', { useNewUrlParser: true, useUnifiedTopology: true });

// Configuration de la stratégie d'authentification
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: 'Utilisateur inconnu' });
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err);
      if (isMatch) return done(null, user);
      return done(null, false, { message: 'Mot de passe incorrect' });
    });
  });
}));

passport.serializeUser((user, done) => done(null, user.id));
//passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user));
