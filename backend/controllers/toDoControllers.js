const ToDo = require('../models/ToDo')

const getTodos = async (req, res, next) => {
    const todos = await ToDo.find()
    res.json(todos)
}

const createToDo = async (req, res, next) => {
    const {text} = await req.body

    try {
        await ToDo.create({text})
    } catch (error) {
        console.log(error)
    }
    res.json({message: 'We added a a task to the to do list'})
}

const deleteToDo = async(req, res, next) => {
    try {
        await ToDo.remove({_id: req.params.id})
    } catch (error) {
        console.log(error)
    }

    res.json({message: 'Task was deleted'})
    
}

const completeToDo = async(req, res, next) => {
    try {
        const todos = await ToDo.findOne({_id: req.params.id})
        todos.completed = !todos.completed
        todos.save()
    } catch (error) {
        console.log(error)
    }
    res.json({message: 'Updated the completed'})
    
    
}

exports.getTodos = getTodos
exports.createToDo = createToDo
exports.deleteToDo = deleteToDo
exports.completeToDo = completeToDo