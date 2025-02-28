import { useState, useEffect } from 'react'

import { Todos, Header } from './components';
import { getNewTodo, updateTodo, deleteTodo } from './components/http-hooks';
import { RemoveTodo, SetTodo, FindTodo } from './utils/index';

import styles from './App.module.css'

function App() {
  const [todos, setTodos] = useState([]);
  //Получаем список дел
  useEffect(() => {
    getNewTodo().then(setDataTodo => setTodos(setDataTodo))
  }, []);

      //Cохранение измененной задачи
      const onSaveChanges = (id) => {
        const { title } = FindTodo(todos, id) || {};

          updateTodo({ id, title }).then(() => {
              setTodos(SetTodo(todos, { id, isChanged: false })); //Получение айди задачи для смены состояния isChanged
          });
      };
      //Удаление задачи
      const onTodoDelete = (id) => {
          deleteTodo(id).then(() => {
            RemoveTodo(todos, id); //Удаление по айди
          })
      };

      const onTodoTitleChange = (id, newTitle) => {
        setTodos(SetTodo(todos, { id, title: newTitle }));
      };

      //Смена состояния для условного рендеринга (измениния задач)
      const onHandleChanged = (id) => {
        setTodos(SetTodo(todos, { id, isChanged: true }));
      };

  return (
    <div className={styles['app']}>
      <Header />
      {todos.map(({ id, title, completed, isChanged = false }) => (
        <Todos 
            key={id} 
            title={title} 
            completed={completed}
            id={id}
            isChanged={isChanged}
            onSaveChanges={() => onSaveChanges(id)}
            onTitleChange={(newTitle) => onTodoTitleChange(id, newTitle)}
            onTodoDelete={() => onTodoDelete(id)}
            onHandleChanged={() => onHandleChanged(id)}
        />
      ))}
    </div>
  )
}

export default App
