const mongoose = require('mongoose');

const todoTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    content: {
        type: String,
        required: true,
    },
    // duedate: {
    //     type: Date,
    // },
    taskDate: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('TodoTask', todoTaskSchema, 'tasks')
