const express = require('express');
const fs = require('fs');
const path = require('path');


const app = express();

app.get('/', (req, res) => {
    res.send('Hello world — serveur volontairement non optimisé mais fonctionnel');
});


// Route optimisée pour gros fichiers
app.get('/big', (req, res) => {
  const filePath = path.join(__dirname, 'maybe-big-file.txt');

  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    const stream = fs.createReadStream(filePath, { encoding: 'utf8' });
    stream.on('data', chunk => {
      res.write(chunk.replace(/\n/g, '<br/>'));
    });
    stream.on('end', () => res.end());
    stream.on('error', err => {
      console.error(err);
      res.status(500).send('Erreur lors de la lecture du fichier');
    });
  } else {
    res.status(404).send('Fichier introuvable');
  }
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur interne du serveur');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});