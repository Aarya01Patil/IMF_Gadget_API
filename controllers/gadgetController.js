// controllers/gadgetController.js
const { Gadget } = require('../models');
const { Op } = require('sequelize');

// GET /gadgets?status={status}
exports.getAllGadgets = async (req, res) => {
  try {
    const statusFilter = req.query.status;
    let where = {};
    if (statusFilter) {
      where.status = statusFilter;
    }
    const gadgets = await Gadget.findAll({ where });

    // Add random mission success probability
    const gadgetsWithProbability = gadgets.map(gadget => {
      const successProbability = Math.floor(Math.random() * 100) + 1;
      return {
        ...gadget.toJSON(),
        missionSuccessProbability: `${successProbability}%`
      };
    });

    res.json(gadgetsWithProbability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /gadgets
exports.createGadget = async (req, res) => {
  try {
    const { name } = req.body;

    // Generate random codename if name not provided
    const codenames = ['The Nightingale', 'The Kraken', 'The Phoenix', 'The Shadow'];
    const codename = name || codenames[Math.floor(Math.random() * codenames.length)];

    const gadget = await Gadget.create({ name: codename });
    res.status(201).json(gadget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /gadgets/:id
exports.updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }

    if (name) gadget.name = name;
    if (status) gadget.status = status;

    await gadget.save();
    res.json(gadget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /gadgets/:id
exports.deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;

    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }

    gadget.status = 'Decommissioned';
    gadget.decommissionedAt = new Date();

    await gadget.save();
    res.json({ message: 'Gadget decommissioned', gadget });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /gadgets/:id/self-destruct
exports.selfDestruct = async (req, res) => {
  try {
    const { id } = req.params;

    // Simulate confirmation code
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    console.log(`Confirmation code sent: ${confirmationCode}`);

    // For simplicity, we'll skip the actual confirmation step

    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found' });
    }

    gadget.status = 'Destroyed';
    await gadget.save();

    res.json({ message: 'Gadget self-destructed', gadget });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};