import React, { Component } from "react";
import axios from 'axios';

export default class EditTodo extends Component
{
    constructor(props) {
        super(props);

        /*
            Because we're accessing the component's state (this.state) in the event
            handler method, we need to create a lexical binding to this for all five
            methods in the constructor. 
            
            This just means we need to retain the meaning of 'this' when React calls
            it in the window next in render().
        */
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoAssignee = this.onChangeTodoAssignee.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_assignee: '',
            todo_priority: '',
            todo_completed: false,
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:4000/todos/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    todo_description: res.data.todo_description,
                    todo_assignee: res.data.todo_assignee,
                    todo_priority: res.data.todo_priority,
                    todo_completed: res.data.todo_completed,
                })
            })
            .catch(err => {
                console.log(err);
            })
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
    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_assignee: this.state.todo_assignee,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };
        console.log(`Submitted todo!\n${obj}`);
        axios.post(`http://localhost:4000/todos/update/${this.props.match.params.id}`, obj)
            .then(res => console.log(res.data));

        // Ensure the user is redirected back to the default route, so that the list of todos is shown again.
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <h3 align="center">Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
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
                            <input
                                className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.todo_priority==="Low"}
                                onChange={this.onChangeTodoProperty}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Low"
                                checked={this.state.todo_priority==="Medium"}
                                onChange={this.onChangeTodoProperty}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="Low"
                                checked={this.state.todo_priority==="High"}
                                onChange={this.onChangeTodoProperty}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={this.onChangeTodoCompleted}
                            checked={this.state.todo_completed}
                            value={this.state.todo_completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}