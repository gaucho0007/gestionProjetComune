// routes/ressourceRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // Route pour récupérer toutes les ressources depuis la base de données
  router.get('/', (req, res) => {
    const query = 'SELECT * FROM ressource';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      res.json(results);
    });
  });

  // Route pour ajouter une nouvelle ressource
  router.post('/', (req, res) => {
    const { Nom_ressource, Description, Quantite_disponible, Cout_unitaire, Identifiant_projet } = req.body;
    const query = 'INSERT INTO ressource (Nom_ressource, Description, Quantite_disponible, Cout_unitaire, Identifiant_projet) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [Nom_ressource, Description, Quantite_disponible, Cout_unitaire, Identifiant_projet], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  });

  // Route pour mettre à jour une ressource existante
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Nom_ressource, Description, Quantite_disponible, Cout_unitaire, Identifiant_projet } = req.body;
    const query = 'UPDATE ressource SET Nom_ressource = ?, Description = ?, Quantite_disponible = ?, Cout_unitaire = ?, Identifiant_projet = ? WHERE Identifiant_ressource = ?';
    connection.query(query, [Nom_ressource, Description, Quantite_disponible, Cout_unitaire, Identifiant_projet, id], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Ressource non trouvée');
      }
      res.status(200).json({ id, ...req.body });
    });
  });

  // Route pour supprimer une ressource
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM ressource WHERE Identifiant_ressource = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Ressource non trouvée');
      }
      res.status(204).send();
    });
  });

  return router;
};
