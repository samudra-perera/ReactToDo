const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ToDoSchema = new Schema({
    text: {
        type: String,
        require: true
    }, 
    completed: {
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: String,
        default: Date.now()
    }
})

const ToDo = mongoose.model('Todo', ToDoSchema)

module.exports = ToDo