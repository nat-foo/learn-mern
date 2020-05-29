# Start the Express server using nodemon
> cd backend
> nodemon server

# Start up the MongoDB backend
> mongod

# Start up the MongoDB client
> mongod
> use todos

# Use Postman to test endpoint connections
[Get Postman](https://www.postman.com/downloads)
> POST localhost:4000/todos/add
    {
        "todo_description": "Test todo",
        "todo_assignee": "Test McTester",
        "todo_priority": "Low",
        "todo_completed": false
    }
> Response should be:
    {
        "todo": "todo added successfully!"
    }
> GET localhost:4000/todos
> GET localhost:4000/todos/5c51995btj3o1v (replace with given ID)