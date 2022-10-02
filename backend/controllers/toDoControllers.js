const ToDo = require('../models/ToDo')

const getTodos = async (req, res, next) => {
    try {
        const todos = await ToDo.find()
        res.json(todos)
    } catch(err) {
        console.log(err)
    }
}

const createToDo = async (req, res, next) => {
    const {text} = await req.body

    try {
        const newTodo = await ToDo.create({text})
        res.json(newTodo)
    } catch (error) {
        console.log(error)
    }
    
}

const deleteToDo = async(req, res, next) => {
    try {
        const result = await ToDo.deleteOne({_id: req.params.id})
        res.json(result)
    } catch (error) {
        console.log(error)
    }
}

const completeToDo = async(req, res, next) => {
    try {
        const todos = await ToDo.findOne({_id: req.params.id})
        todos.completed = !todos.completed
        todos.save()
        res.json(todos)
    } catch (error) {
        console.log(error)
    }
}

exports.getTodos = getTodos
exports.createToDo = createToDo
exports.deleteToDo = deleteToDo
exports.completeToDo = completeToDo