const express = require('express');
const Task = require('../models/task'); // Make sure the path is correct
const axios = require('axios'); // Add this line to import axios
const router = express.Router();
 // Ensure this matches the correct path to your task model


// URL of microservice1 (Client and Fornisseur Service)
const CLIENT_FORNISSEUR_API = 'http://localhost:3001'; // Adjust as necessary

// CRUD endpoints for Task
// Create a new task for a specific client
router.post('/:clientId/tasks', async (req, res) => {
    const clientId = req.params.clientId; // Get clientId from request parameters
    const task = new Task({ ...req.body, clientId }); // Assign clientId to the task

    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

// Get a specific task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Fetch client and fornisseur details from the first service
router.get('/client-fornisseur/:clientId/:fornisseurId', async (req, res) => {
    try {
        const clientResponse = await axios.get(`${CLIENT_FORNISSEUR_API}/clients/${req.params.clientId}`);
        const fornisseurResponse = await axios.get(`${CLIENT_FORNISSEUR_API}/fornisseurs/${req.params.fornisseurId}`);
        res.json({ client: clientResponse.data, fornisseur: fornisseurResponse.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch client or fornisseur details' });
    }
});

module.exports = router;
