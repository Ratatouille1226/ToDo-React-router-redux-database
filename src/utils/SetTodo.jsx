export const SetTodo = (todos, newTodo) => todos.map((todo) => {
    if (todo.id === newTodo.id) {
        return {
            ...todo,
            ...newTodo,
        }
    }

    return todo
});