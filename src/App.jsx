import { useState, useEffect } from 'react'

import { Todos, Header } from './components';
import { getNewTodo, updateTodo, deleteTodo, createNewTodo } from './components/http-hooks';
import { RemoveTodo, SetTodo, FindTodo, AddNewTodo } from './utils/index';

import styles from './App.module.css'


//Вместо методов map, filter и тд, используются утилиты, с запросом к серверу (CRUD) операциям точно также

function App() {
  const [todos, setTodos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isSort, setIsSort] = useState(false);

  //Получаем список дел
  useEffect(() => {
    getNewTodo().then(setDataTodo => setTodos(setDataTodo.reverse()))
  }, []);

      //Создание задачи
      const onTodoAdd = () => {
        setTodos(AddNewTodo(todos));
      }

      //Cохранение измененной задачи
      const onSaveChanges = (idTodo) => {
        const { title, completed } = FindTodo(todos, idTodo) || {}; //Возвращает задачу по айди

        if (idTodo === 'new_id') { //new_id из утилиты AddNewTodo
            createNewTodo({ title, completed }).then((todo) => {
              let updatesTodo = SetTodo(todos, { id: 'new_id', isChanged: false });

              updatesTodo = RemoveTodo(updatesTodo, 'new_id');
              updatesTodo = AddNewTodo(updatesTodo, todo);

              setTodos(updatesTodo);
            }); //Создание новой задачи
        } else {
            updateTodo({ id: idTodo, title }).then(() => {
              setTodos(SetTodo(todos, { id: idTodo, isChanged: false })); //Получение айди задачи для смены состояния isChanged
            });
        }
      };

      //Удаление задачи
      const onTodoDelete = (id) => {
          deleteTodo(id).then(() => {
            setTodos(RemoveTodo(todos, id)); //Удаление по айди
          })
      };

      const onTodoTitleChange = (id, newTitle) => {
        setTodos(SetTodo(todos, { id, title: newTitle }));
      };

      //Смена состояния для условного рендеринга (измениния задач)
      const onHandleChanged = (id) => {
        setTodos(SetTodo(todos, { id, isChanged: true }));
      };
      //Смена состояния выполнена задача или нет
      const onChangeComplitedTask = (id, complitedTask) => {
        updateTodo({ id, completed: complitedTask }).then(() => {
          setTodos(SetTodo(todos, { id, completed: complitedTask }));
      });
       
      }

  return (
    <div className={styles['app']}>
      <Header onTodoAdd={onTodoAdd} />
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
            onComplitedTask={(complitedTask) => onChangeComplitedTask(id, complitedTask)}
        />
      ))}
    </div>
  )
}

export default App
