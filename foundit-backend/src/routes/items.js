const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all lost items
router.get('/lost', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM LostItems ORDER BY date_lost DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new lost item
router.post('/lost', async (req, res) => {
    const { item_name, date_lost, place_lost, reported_by } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO LostItems (item_name, date_lost, place_lost, reported_by) VALUES (?, ?, ?, ?)',
            [item_name, date_lost, place_lost, reported_by]
        );
        res.status(201).json({ id: result.insertId, message: 'Lost item reported' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all found items
router.get('/found', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM FoundItems ORDER BY date_found DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new found item
router.post('/found', async (req, res) => {
    const { item_name, date_found, location_found, turned_in_by } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO FoundItems (item_name, date_found, location_found, turned_in_by) VALUES (?, ?, ?, ?)',
            [item_name, date_found, location_found, turned_in_by]
        );
        res.status(201).json({ id: result.insertId, message: 'Found item reported' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
