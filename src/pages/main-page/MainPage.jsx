import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import { getNewTodo, updateTodo } from '../../components/http-hooks/index';
import { SetTodo} from '../../utils/index';

import {  Header } from '../../components/index';
import { SearchTodo, SortTodo } from './components/index';

import styles from '../../components/header/Header.module.css'

//Вместо методов map, filter и тд, используются утилиты, с запросом к серверу (CRUD) операциям точно также

export const MainPage = () => {
    const [todos, setTodos] = useState([]);
    const [searchValue, setSearchValue] = useState(''); //Стейт для поиска задач
    const [isSort, setIsSort] = useState(false); //Сортировка
  
    //Получаем список дел
    useEffect(() => {
      getNewTodo(searchValue, isSort).then(setDataTodo => setTodos(setDataTodo))
    }, [searchValue, isSort]);
  

        //Смена состояния выполнена задача или нет
        const onChangeComplitedTask = (id, complitedTask) => {
          updateTodo({ id, completed: complitedTask }).then(() => {
            setTodos(SetTodo(todos, { id, completed: complitedTask }));
          });
        }

   return (
     <>
       <Header >
            <SearchTodo onSearch={setSearchValue}/>
            <SortTodo onSort={setIsSort}/>
            <button><Link to="/task">Добавить</Link></button>
       </Header>
       {todos.map(({ id, title, completed }) => (
        <div key={id} className={styles['todo']}>
            <input 
                className={styles['checkbox']} 
                type='checkbox' 
                checked={completed} 
                readOnly 
                onChange={({ target }) => onChangeComplitedTask(id, target.checked)}
            />
             <Link to={`/task/${id}`} className={styles['todo_name']}>
                    <div className={styles[completed ? 'complited' : null]}>{title}</div>
            </Link>
        </div>
         
       ))}
     </>
   )
}