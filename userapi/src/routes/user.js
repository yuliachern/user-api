const express = require('express');
const userController = require('../controllers/user');

const userRouter = express.Router();

// CREATE
userRouter.post('/', (req, res) => {
  userController.create(req.body, (err, result) => {
    if (err) return res.status(400).json({ status: 'error', msg: err.message });
    res.status(201).json({ status: 'success', msg: result });
  });
});

// READ
userRouter.get('/:username', (req, res) => {
  userController.read(req.params.username, (err, result) => {
    if (err) return res.status(404).json({ status: 'error', msg: err.message });
    res.status(200).json({ status: 'success', user: result });
  });
});

// UPDATE
userRouter.put('/:username', (req, res) => {
  userController.update(req.params.username, req.body, (err, result) => {
    if (err) return res.status(400).json({ status: 'error', msg: err.message });
    res.status(200).json({ status: 'success', msg: result });
  });
});

// DELETE
userRouter.delete('/:username', (req, res) => {
  userController.delete(req.params.username, (err, result) => {
    if (err) return res.status(404).json({ status: 'error', msg: err.message });
    res.status(200).json({ status: 'success', msg: result });
  });
});

module.exports = userRouter;
