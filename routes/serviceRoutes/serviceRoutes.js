// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // Route pour récupérer tous les services depuis la base de données
  router.get('/', (req, res) => {
    const query = 'SELECT * FROM service';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      res.json(results);
    });
  });

  // Route pour ajouter un nouveau service
  router.post('/', (req, res) => {
    const { Nom_service, Responsable, Identifiant_projet } = req.body;
    const query = 'INSERT INTO service (Nom_service, Responsable, Identifiant_projet) VALUES (?, ?, ?)';
    connection.query(query, [Nom_service, Responsable, Identifiant_projet], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  });

  // Route pour mettre à jour un service existant
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Nom_service, Responsable, Identifiant_projet } = req.body;
    const query = 'UPDATE service SET Nom_service = ?, Responsable = ?, Identifiant_projet = ? WHERE Identifiant_service = ?';
    connection.query(query, [Nom_service, Responsable, Identifiant_projet, id], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Service non trouvé');
      }
      res.status(200).json({ id, ...req.body });
    });
  });

  // Route pour supprimer un service
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM service WHERE Identifiant_service = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Service non trouvé');
      }
      res.status(204).send();
    });
  });

  return router;
};
