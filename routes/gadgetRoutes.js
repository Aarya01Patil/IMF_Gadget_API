const express = require('express');
const router = express.Router();
const gadgetController = require('../controllers/gadgetController');
const auth = require('../middleware/auth');

// For bonus points, protect routes with auth middleware
router.get('/', auth, gadgetController.getAllGadgets);
router.post('/', auth, gadgetController.createGadget);
router.patch('/:id', auth, gadgetController.updateGadget);
router.delete('/:id', auth, gadgetController.deleteGadget);
router.post('/:id/self-destruct', auth, gadgetController.selfDestruct);

module.exports = router;