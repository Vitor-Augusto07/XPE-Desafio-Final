const express = require('express');
const ctrl = require('../controllers/clienteController');
const router = express.Router();


router.get('/', ctrl.listarTodos);                 // Find All
router.get('/count', ctrl.contar);                 // Contagem total
router.get('/search', ctrl.buscarPorNome);         // Find By Name
router.get('/:id', ctrl.buscarPorId);              // Find By ID
router.post('/', ctrl.criar);                      // Create
router.put('/:id', ctrl.atualizar);                // Update
router.delete('/:id', ctrl.deletar);               // Delete

module.exports = router;
