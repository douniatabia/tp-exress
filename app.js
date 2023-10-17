const express = require('express');
const session = require('express-session');
const booksRouter = require('./booksRouter');
const authRouter = require('./authRouter');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
// Configuration de la session (vous devrez configurer les options appropriées)
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Utilisation des routeurs
app.use('/books', booksRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.render('index'); // Page d'accueil avec formulaire d'inscription et de connexion.
});

app.post('/register', (req, res) => {
  // Gérer l'inscription (créer un utilisateur dans MongoDB).
  // Rediriger vers la page de connexion après une inscription réussie.
});

app.get('/login', (req, res) => {
  res.render('login'); // Page de connexion.
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/books',
  failureRedirect: '/login',
  failureFlash: true
}));



const port = 3004;
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur le port ${port}`);
  });

  app.get('/', (req, res) => {
    res.render('index'); // Page d'accueil avec formulaire d'inscription et de connexion.
  });
  
  app.post('/register', (req, res) => {
    // Gérer l'inscription (créer un utilisateur dans MongoDB).
    // Rediriger vers la page de connexion après une inscription réussie.
  });
  
  app.get('/login', (req, res) => {
    res.render('login'); // Page de connexion.
  });
  
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/login',
    failureFlash: true
  }));
  
  
  
  
  
  
  
