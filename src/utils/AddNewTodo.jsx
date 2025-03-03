export const AddNewTodo = (todos, todo) => {
    const newTodo = todo || { id: 'new_id', title: '', completed: false, isChanged: true };

    return [newTodo, ...todos];
};