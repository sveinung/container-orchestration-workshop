var Todo = React.createClass({
    getInitialState: function() {
        return {
            id: this.props.id,
            title: this.props.title,
            description: this.props.description,
            done: this.props.done
        };
    },

    render: function() {
        return (
            <tr key={this.state.id}>
                <td>
                    <input
                        type="checkbox"
                        label="Done?"
                        checked={this.state.done}
                        onChange={this.handleChange} />
                </td>
                <td>{this.state.title}</td>
                <td>{this.state.description}</td>
                <td><button className="btn btn-danger" onClick={this.handleClick}>Remove</button></td>
            </tr>
        );
    },

    handleChange: function(done) {
        $.ajax({
            url: this.props.url,
            dataType: "json",
            contentType: "application/json",
            type: "PUT",
            data: JSON.stringify({
                id: this.state.id,
                title: this.state.title,
                description: this.state.description,
                done: done.target.checked
            }),
            success: function(savedTodo) {
                this.setState({ done: savedTodo.done });
            }.bind(this),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleClick: function(event) {
        $.ajax({
            url: this.props.url + "/" + this.state.id,
            type: "DELETE",
            success: function() {
                this.props.onDelete(this.state.id)
            }.bind(this),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }
});

var Todos = React.createClass({
    getInitialState: function() {
        return {
            todos: [],
            title: "",
            description: ""
        };
    },

    componentDidMount: function() {
        $.ajax(this.props.url)
            .done(function(todos) {
                this.setState({todos: todos});
            }.bind(this));
    },

    render: function() {
        return (
        <div>
        <hr/>
        <div className="row">
            <div className="col-md-6 col-md-offset-3">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                <input
                    className="form-control"
                    type="text" value={this.state.title}
                    onChange={this.handleTitleChange} placeholder="Title" />
                </div>
                <div className="form-group">
                <input
                    className="form-control"
                    type="text" value={this.state.description}
                    onChange={this.handleDescriptionChange} placeholder="description"/>
                </div>
                <input className="btn btn-default" type="submit" defaultValue="Post" />
            </form>
            </div>
        </div>
        <hr/>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Done</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Delete?</th>
                </tr>
            </thead>
            <tbody>
            {this.state.todos.map((todo) => (
                <Todo
                    url={this.props.url}
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    done={todo.done}
                    onDelete={this.deleteItem} />
            ))}
            </tbody>
        </table>
        </div>
        );
    },

    handleTitleChange: function(event) {
        this.setState({ title: event.target.value });
    },

    handleDescriptionChange: function(event) {
        this.setState({ description: event.target.value })
    },

    handleSubmit: function(event) {
        event.preventDefault();

        var newTodo = {
            title: this.state.title,
            description: this.state.description
        };

        $.ajax({
            url: this.props.url,
            dataType: "json",
            contentType: "application/json",
            type: "POST",
            data: JSON.stringify(newTodo),
            success: function(savedTodo) {
                var updatedTodos = this.state.todos.concat(savedTodo);
                this.setState({todos: updatedTodos});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    deleteItem: function(id) {
        this.setState({
            todos: this.state.todos.filter((todo) => todo.id !== id)
        });
    }
});

ReactDOM.render(
    <Todos url="http://localhost:8080/v1" />,
    document.getElementById('reactContainer')
);
