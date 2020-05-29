import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

/*
    The Todo component is implemented as a functional 
    React component. It outputs the table row, which
    contains the value of the properties of the todo
    item passed into that component. Inside the Actions
    column of the table, we're also outputting a link
    to /edit/:id route by using the Link component.
*/
const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>{props.todo.todo_assignee}</td>
        <td>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component
{
    /*
        Initialize the state with an empty ToDos array.
    */
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
    }
    /*
        Retrieve the ToDos data from the database.
    */
    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
            .then(res => {
                this.setState({
                    todos: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    /*
        Output each todo item currently held in the state.
    */
    todoList() {
        return this.state.todos.map( (currentTodo, i) => {
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    /*
        Output a table row for each todo item.
    */
    render() {
        return (
            <div>
                <h3>To-Do's List</h3> 
                <table className="table table-striped" style={{marginTop: 20}} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Assignee</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}