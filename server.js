// Declare variables
const express = require('express')
const app = express()
const PORT = 3000;
const mongoose = require('mongoose')
const TodoTask = require('./models/todotask')
require('dotenv').config()

//Set Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser:true})
.then(() => console.log('Connected Successfully to db'))
.catch((err) => { console.error(err); });

async function getTodos(){
    const TodoTasks = await TodoTask.find({});
    return TodoTasks;
  }

// GET METHOD
app.get("/", async (req, res) => {
    try {
        getTodos().then(tasks => {
            res.render("index.ejs", { todoTasks: tasks });
        });
        } catch (error) {
    res.status(500).send({message: error.message})
}
});


//POST METHOD
app.post('/', async (req, res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content,
            // duedate: req.body.duedate
        });
    try {
        await todoTask.save();
        console.log(todoTask)
        res.redirect("/");
    } catch (err) {
        if (err) return res.status(500).send(err);
        res.redirect("/");
    }
});

//UPDATE METHOD

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
