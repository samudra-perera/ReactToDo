const express = require('express')
const { getTodos, createToDo, deleteToDo, completeToDo } = require('../controllers/toDoControllers')
const router = express.Router()

router.get('/toDo', getTodos)
router.post('/new', createToDo)
router.delete('/toDO/delete/:id', deleteToDo)
router.put('/toDo/complete/:id', completeToDo)

module.exports = router