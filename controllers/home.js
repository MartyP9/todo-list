const TodoTask = require('../models/todotask')

module.exports={
    getIndex : async (req, res) => {
        try {
            const TodoTasks = await 
            TodoTask.find().then(tasks => {
            res.render("index.ejs", { todoTasks: tasks })});
            } catch (error) {
                res.status(500).send({message: error.message})
            }
    },
    
    //POST METHOD
    createTask:  async (req, res) => {
        const todoTask = new TodoTask({ 
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
    }
    
}