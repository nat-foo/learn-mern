
/*
    Express is a fast and lightweight web framework for Node JS.
*/
const Express = require('express');
const App = Express();

/*
    Body Parser is middleware for parsing body of reqs Node JS.
*/
const BodyParser = require('body-parser');

/*
    CORS is a Node JS package for providing an Express middleware
    that can be used to enable CORS with various options. 
    Cross-origin resource sharing (CORS) is a mechanism that allows 
    restricted resources on a web page to be requested from another
    domain outside the domain from which the first resource was served.
*/
const Cors = require('cors');

/*
    Mongoose is a Node JS framework which lets us access MongoDB in
    an object-oriented way.
*/
const Mongoose = require('mongoose');

/*
    Create an instance of Express Router to setup the endpoints.
*/
const TodoRoutes = Express.Router();

/*
    Access the Mongoose schema for our Todo entry.
*/
const Todo = require('./todo.model');
const PORT = 4000;

/*
    Connect to MongoDB.
*/
Mongoose.connect('mongodb://127.0.0.1:27017/todos', { 
    useNewUrlParser: true 
});
const Connection = Mongoose.connection;

Connection.once('open', () => {
    console.log("MongoDB database Connection established successfully");
})

/*
    The function which is passed into 'get' is used to handle
    incoming HTTP GET requests on the /todos/ URL path. In this
    case, we're calling Todos.find to retrieve a list of all
    todo items from the MongoDB database.

    Again, the call of the find methods takes one argument:
    a callback function which is executed once the result is
    available. Here we're making sure the results (available in
    todos) are added in JSON format to the response body.
*/
TodoRoutes.route('/').get( (req, res) => {
    Todo.find( (err, todos) => {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

/*
    The next endpoint which needs to be implemented is '/:id'.
    This path extension is used to retrieve a todo item by 
    providing an ID.

    Here, we're accepting the URL parameter /id/ which can be
    accessed via req.params.id. This id is passed into the call
    of Todo.findById to retrieve an issue item based on its ID.
    Once the todo object is available, it is attached to the 
    HTTP response in JSON format.
*/
TodoRoutes.route('/:id').get( (req, res) => {
    let id = req.params.id;
    Todo.findById(id, (err, todo) => {
        res.json(todo);
    });
});

/*
    Next, we need to add the route that adds new todo items
    by sending a HTTP POST request (/add).

    The new todo item is part of the HTTP POST req body,
    so that we're able to access it via req.body, and use
    it to create a new instance of Todo. This new item is
    then saved to the DB by calling the 'save' method.
*/
TodoRoutes.route('/add').post( (req, res) => {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({
                'todo': 'todo added successfully'
            });
        })
        .catch(err => {
            res.status(400).send('adding new todo failed!');
        });
});

/*
    Finally, we need an HTTP POST route for /update/:id.

    This route is used to update an existing todo item.
    Again, this path is containing a parameter: id. Inside
    the callback function passed to post(), we're first
    retrieving the old todo item from the DB based on the ID.
    Then we're setting the todo property values to what's 
    available in the request body. Finally, we need to call
    todo.save() to save the updated object in the DB.
*/
TodoRoutes.route('/update/:id').post( (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if (!todo) {
            res.status(404).send('Data not found!');
        } else {
            todo.todo_description = req.body.todo_description;
            todo.todo_assignee = req.body.todo_assignee;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save()
                .then(todo => {
                    res.json('Todo updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible!");
                });
        }
    });
});

/*
    Use CORS and BodyParser in our project.
*/
App.use(Cors());
App.use(BodyParser.json());

/*
    Add the Todo Router as middleware to take control of 
    requests starting with path '/todos'.
*/
App.use('/todos', TodoRoutes);

/*
    Listen for client connections.
*/
App.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});
