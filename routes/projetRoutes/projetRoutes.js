// routes/projetRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // Route pour récupérer tous les projets depuis la base de données
  router.get('/', (req, res) => {
    const query = 'SELECT * FROM projet';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      res.json(results);
    });
  });

  // Route pour ajouter un nouveau projet
  router.post('/', (req, res) => {
    const { Nom_projet, Description, Date_debut, Date_fin, Statut, Budget, Identifiant_commune } = req.body;
    const query = 'INSERT INTO projet (Nom_projet, Description, Date_debut, Date_fin, Statut, Budget, Identifiant_commune) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [Nom_projet, Description, Date_debut, Date_fin, Statut, Budget, Identifiant_commune], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  });

  // Route pour mettre à jour un projet existant
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Nom_projet, Description, Date_debut, Date_fin, Statut, Budget, Identifiant_commune } = req.body;
    const query = 'UPDATE projet SET Nom_projet = ?, Description = ?, Date_debut = ?, Date_fin = ?, Statut = ?, Budget = ?, Identifiant_commune = ? WHERE Identifiant_projet = ?';
    connection.query(query, [Nom_projet, Description, Date_debut, Date_fin, Statut, Budget, Identifiant_commune, id], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Projet non trouvé');
      }
      res.status(200).json({ id, ...req.body });
    });
  });

  // Route pour supprimer un projet
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM projet WHERE Identifiant_projet = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Projet non trouvé');
      }
      res.status(204).send();
    });
  });

  return router;
};
