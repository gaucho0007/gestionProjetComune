// index.js
const express = require('express');
const app = express();
const mysql = require('mysql');
const createCommuneRoutes = require('./routes/communeRoutes/communeRoutes');
const createEmployeRoutes = require('./routes/employeRoutes/employeRoutes');
const createProjetRoutes = require('./routes/projetRoutes/projetRoutes');
const createressourceRoutes = require('./routes/ressourceRoutes/ressourceRoutes');
const createserviceRoutes = require('./routes/serviceRoutes/serviceRoutes');

// Middleware pour gérer le corps des requêtes JSON
app.use(express.json());
// Port d'écoute du serveur
const port = 5000;

// Connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Remplacez par le nom d'hôte de votre base de données
  user: 'root', // Remplacez par votre nom d'utilisateur MySQL
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'GPC' // Remplacez par le nom de votre base de données
});

connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err.stack);
      return;
    }
    console.log('Connexion à la base de données réussie');   
  });
// Montage des routes communes avec la connexion MySQL passée en paramètre
const communeRoutes = createCommuneRoutes(connection);
const employeRoutes = createEmployeRoutes(connection);
const projetRoutes = createProjetRoutes(connection);
const ressourceRoutes = createressourceRoutes(connection);
const serviceRoutes = createserviceRoutes(connection);

// Définitions du middlware pour chaque routes
app.use('/commune', communeRoutes);
app.use('/employe', employeRoutes);
app.use('/projet', projetRoutes);
app.use('/ressource', ressourceRoutes);
app.use('/service', serviceRoutes);


app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
