// routes/employeRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (connection) => {
  // Route pour récupérer tous les employés depuis la base de données
  router.get('/', (req, res) => {
    const query = 'SELECT * FROM employe';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      res.json(results);
    });
  });

  // Route pour ajouter un nouvel employé
  router.post('/', (req, res) => {
    const { Nom, Prenom, Fonction, Identifiant_service } = req.body;
    const query = 'INSERT INTO employe (Nom, Prenom, Fonction, Identifiant_service) VALUES (?, ?, ?, ?)';
    connection.query(query, [Nom, Prenom, Fonction, Identifiant_service], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      res.status(201).json({ id: result.insertId, ...req.body });
    });
  });

  // Route pour mettre à jour un employé existant
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Nom, Prenom, Fonction, Identifiant_service } = req.body;
    const query = 'UPDATE employe SET Nom = ?, Prenom = ?, Fonction = ?, Identifiant_service = ? WHERE Identifiant_employe = ?';
    connection.query(query, [Nom, Prenom, Fonction, Identifiant_service, id], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Employé non trouvé');
      }
      res.status(200).json({ id, ...req.body });
    });
  });

  // Route pour supprimer un employé
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM employe WHERE Identifiant_employe = ?';
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err.stack);
        return res.status(500).send('Erreur du serveur');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Employé non trouvé');
      }
      res.status(204).send();
    });
  });

  return router;
};
