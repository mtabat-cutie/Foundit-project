const express = require('express');
const router = express.Router();
const supabase = require('../config/db');

// GET all lost items
router.get('/lost', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('LostItems')
            .select('*')
            .order('date_lost', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new lost item
router.post('/lost', async (req, res) => {
    const { item_name, date_lost, place_lost, reported_by } = req.body;
    try {
        const { data, error } = await supabase
            .from('LostItems')
            .insert([{ item_name, date_lost, place_lost, reported_by }])
            .select();
        
        if (error) throw error;
        res.status(201).json({ id: data[0].id, message: 'Lost item reported' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET all found items
router.get('/found', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('FoundItems')
            .select('*')
            .order('date_found', { ascending: false });
        
        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new found item
router.post('/found', async (req, res) => {
    const { item_name, date_found, location_found, turned_in_by } = req.body;
    try {
        const { data, error } = await supabase
            .from('FoundItems')
            .insert([{ item_name, date_found, location_found, turned_in_by }])
            .select();
        
        if (error) throw error;
        res.status(201).json({ id: data[0].id, message: 'Found item reported' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
