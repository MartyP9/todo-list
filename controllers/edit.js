const TodoTask = require('../models/todotask')

module.exports = {
    getEdit: (async (req,res)=>{
        const id = req.params.id;
        const TodoTasks = await 
            TodoTask.find().then(tasks => {
            res.render('edit.ejs',{
                todoTasks:tasks, idTask: id
            })
        })
    }),
    deleteTask: (async (req, res) => {
        const id = await req.params.id;
        try {
            const updatedResult =
                await TodoTask.findByIdAndRemove(
                    { _id: id }
                );
            res.redirect("/");
        } catch (err) {
            if (err) return res.status(500).send(err);
            res.redirect("/");
        }}),

    updateTask: (async (req, res) => {
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
}