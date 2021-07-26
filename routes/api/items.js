const { Router } = require('express');
const { model } = require('mongoose');
const Item = require('../../models/Item.js');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const Items = await Item.find();
        if(!Items) throw new Error('No items found!');
        res.status(200).json(Items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    const newItem = new Item(req.body);

    try {
        const item = await newItem.save();
        if(!item) throw new Error('An error occurred while saving the item!');
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await Item.findByIdAndUpdate(id, req.body);
        if(!response) throw new Error('Something went terribly wrong :/');
        const updated = { ...response._doc, ...req.body };
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const removed = await Item.findByIdAndDelete(id, req.body);
        if(!removed) throw new Error('Something went terribly wrong :/');
        res.status(200).json(removed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;