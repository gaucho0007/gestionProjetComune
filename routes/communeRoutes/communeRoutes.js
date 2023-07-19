const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // Route pour récupérer toutes les communes depuis la base de données
  router.get('/', (req, res) => {
    const query = 'SELECT * FROM commune';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      res.json(results);
    });
  });

  // Route pour ajouter une nouvelle commune
  router.post('/', (req, res) => {
    const { Nom_commune, Adresse_commune, Population } = req.body;
    const query = 'INSERT INTO commune (Nom_commune, Adresse_commune, Population) VALUES (?, ?, ?)';
    connection.query(query, [Nom_commune, Adresse_commune, Population], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  });

  // Route pour mettre à jour une commune existante
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Nom_commune, Adresse_commune, Population } = req.body;
    const query = 'UPDATE commune SET Nom_commune = ?, Adresse_commune = ?, Population = ? WHERE Identifiant_commune = ?';
    connection.query(query, [Nom_commune, Adresse_commune, Population, id], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Commune non trouvée');
      }
      res.status(200).json({ id, ...req.body });
    });
  });

  // Route pour supprimer une commune
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM commune WHERE Identifiant_commune = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Commune non trouvée');
      }
      res.status(204).send();
    });
  });

  return router;
};

