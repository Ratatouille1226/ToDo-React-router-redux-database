import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { Header } from "../../components";
import { deleteTodo, readTodo, createNewTodo, updateTodo } from "../../components/http-hooks/index";

import styles from './todoPage.module.css';

export const TodoPage = () => {
    const [title, setTitle] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

        //Получаем список дел
        useEffect(() => {
            if (id === undefined) return

          readTodo(id).then((loadedTodo) => {
            if (loadedTodo.title === undefined) {
                navigate('/404');
            }

            setTitle(loadedTodo.title)
          })
        }, [id, navigate]);
      
        const onTitleChange = ({ target }) => setTitle(target.value);

        //Удаление задачи
        const onRemove = () => deleteTodo(id).then(() => navigate('/'));

        //Cохранение измененной задачи
        const onSave = () => {
            if (id === undefined) { //new_id из утилиты AddNewTodo
                createNewTodo({ title, completed: false }).then(() => navigate('/'));
            } else {
                updateTodo({ id, title }).then(() => navigate('/'));
            }
        };

    return (
        <>
        <Header >
             <button onClick={onRemove}>Удалить</button>
             <button onClick={onSave}>Сохранить</button>
             <button><Link to="/">Назад</Link></button>
        </Header>
        <div>
            <input 
                className={styles['input_todo']}  
                value={title}
                onChange={onTitleChange}  
                placeholder="Введите текст задачи"
            />
        </div>
      </>
    );
}