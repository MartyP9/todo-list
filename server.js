// Declare variables
const express = require('express')
const app = express()
const PORT = 3000;
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const TodoTask = require('./models/todotask')
require('dotenv').config({path: './config/.env'})

//Set Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

// Connect to DB
connectDB()

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
            content: req.body.content
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
app
    .route('/edit/:id')
    .get((req,res)=>{
        const id = req.params.id;
        getTodos().then(tasks => {
            res.render('edit.ejs',{
                todoTasks:tasks, idTask: id
            })
        })
    })
    .post(async (req, res) => {
        const id = req.params.id;
        try {
            const updatedResult =
                await TodoTask.findByIdAndUpdate(
                    { _id: id },
                    {
                        title: req.body.title,
                        content: req.body.content
                    }
                );
                res.redirect("/");
        } catch (err) {
            if (err) return res.status(500).send(err);
            res.redirect("/");
    }})
    
//DELETE
app
    .route("/remove/:id")
    .get(async (req, res) => {
        const id = req.params.id;
        try {
            const updatedResult =
                await TodoTask.findByIdAndRemove(
                    { _id: id },
                );
                res.redirect("/");
        } catch (err) {
            if (err) return res.status(500).send(err);
            res.redirect("/");
    }})
        
    //     TodoTask.findByIdAndRemove(id, err => {
    //         if (err) return res.send(500, err);
    //         res.redirect("/");
    //     });
    // });

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))
