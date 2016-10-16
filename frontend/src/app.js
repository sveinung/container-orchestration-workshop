var Todo = React.createClass({
    getInitialState: function() {
        return {};
    },

    render: function() {
        return (
            <li key={this.props.id}>
                <span>{this.props.title}</span>
                <span> – </span>
                <span>{this.props.description}</span>
                <input
                    type="checkbox"
                    label="Done?"
                    checked={this.state.done}
                    onChange={this.handleChange}/>
            </li>
        );
    },

    handleChange: function(done) {
        this.props.updateItem(this.props.id, done.target.checked);
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

    updateItem: function(id, done) {
        var otherTodos = this.state.todos.filter((todo) => {
            if (todo.id !== id) {
                return todo;
            }
        });
        var todoToUpdate = this.state.todos.find((todo) => {
            if (todo.id === id) {
                return todo;
            }
        });
        todoToUpdate.done = done;

        var updatedTodos = otherTodos.concat(todoToUpdate);

        $.ajax({
            url: this.props.url,
            dataType: "json",
            contentType: "application/json",
            type: "PUT",
            data: JSON.stringify(todoToUpdate),
            success: function(savedTodo) {
                var updatedTodos = this.state.todos.concat(savedTodo);
                this.setState({todos: updatedTodos});
            }.bind(this),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
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

    render: function() {
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text" value={this.state.title}
                    onChange={this.handleTitleChange} placeholder="Title" />
                <input
                    type="text" value={this.state.description}
                    onChange={this.handleDescriptionChange} placeholder="description"/>
                <input type="submit" defaultValue="Post" />
            </form>
            <ol>
                {this.state.todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        done={todo.done}
                        updateItem={this.updateItem} />
                ))}
            </ol>
            </div>
        );
    }
});

ReactDOM.render(
    <Todos url="http://localhost:8080/v1" />,
    document.getElementById('container')
);
