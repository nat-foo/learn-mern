import React, { Component } from 'react';
/*
    Axios is a JS library used to make HTTP requests frm Node JS,
    or XMLHttpRequests from the browser. Where it shines from the 
    standard way of doing these tasks, is improving '.fetch()'.

    By using axios, we remove the need to pass the results of the
    HTTP request to the .json() method. Axios simply returns the 
    data object you expect straight away. Additionally, any kind 
    of error will successfully execute the catch() block out of 
    the box.

    https://medium.com/@MinimalGhost/what-is-axios-js-and-why-should-i-care-7eb72b111dc0
*/
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoAssignee = this.onChangeTodoAssignee.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_assignee: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onChangeTodoAssignee(e) {
        this.setState({
            todo_assignee: e.target.value
        });
    }

    onChangeTodoPriority(e) {
        this.setState({
            todo_priority: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Assignee: ${this.state.todo_assignee}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);
        
        const newToDo = {
            todo_description: this.state.todo_description,
            todo_assignee: this.state.todo_assignee,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        /*
            Use the Axios POST method to send an HTTP POST request
            to the backend endpoint for adding an item.
        */
        axios.post('http://localhost:4000/todos/add', newToDo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_assignee: '',
            todo_priority: '',
            todo_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Assignee: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.todo_assignee}
                                onChange={this.onChangeTodoAssignee}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.todo_priority==='Low'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.todo_priority==='Medium'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.todo_priority==='High'} 
                                    onChange={this.onChangeTodoPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}