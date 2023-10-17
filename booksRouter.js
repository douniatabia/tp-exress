const express = require('express');
const booksRouter = express.Router();
const books = [];

// Route pour répertorier les livres
booksRouter.get('/', (req, res) => {
  //res.send('Liste des livres');
  res.json(books);
});

// Route pour créer un nouveau livre (vous devrez gérer la logique de création)
booksRouter.post('/', (req, res) => {
  // Logique de création de livre ici
  //res.send('Livre créé avec succès');
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const newBook = {
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

module.exports = booksRouter;

