const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// 1. GET all employee records (for the Master List view)
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. GET a single employee record by Personnel Number (for Slip View)
router.get('/:personnelNumber', async (req, res) => {
    try {
        const employee = await Employee.findOne({ personnelNumber: req.params.personnelNumber });
        if (!employee) return res.status(404).json({ message: 'Employee record not found' });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. POST - Save new employee or update existing record
router.post('/save', async (req, res) => {
    try {
        const { personnelNumber } = req.body;
        const updatedEmployee = await Employee.findOneAndUpdate(
            { personnelNumber },
            req.body,
            { returnDocument: 'after', upsert: true, runValidators: true }
        );
        res.status(200).json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 4. DELETE an employee record
router.delete('/:personnelNumber', async (req, res) => {
    try {
        const deletedEmployee = await Employee.findOneAndDelete({ personnelNumber: req.params.personnelNumber });
        if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee record deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;