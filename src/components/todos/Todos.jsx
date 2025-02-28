import { useState } from 'react';
import styles from './Todos.module.css';
import PropTypes from 'prop-types';

import { updateTodo, deleteTodo } from '../http-hooks';

export const Todos = ({ id, title, completed }) => {
    //Для того чтобы изменять задачи, если тру то будет инпут в которое вводится новое название для задачи (условный рендеринг)
    const [isChanged, setIsChanged] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    //Смена состояния для условного рендеринга (измениния задач)
    const onHandleChanged = () => {
        setIsChanged(true);
    }
    //Измененная задача
    const onChangeTitle = ({ target }) => {
        setNewTitle(target.value);
    }
    //Cохранение измененной задачи
    const onSaveChanges = () => {
        setIsChanged(false);
        updateTodo({ id, title: newTitle });
    }
    //Удаление задачи
    const onTodoDelete = () => {
        deleteTodo(id)
    }

    return (
        <div className={styles['todos']}>
            <input 
                className={styles['checkbox']} 
                type='checkbox' 
                checked={completed} 
                readOnly 
            />
            <div className={styles['todo_name']}>
                {isChanged ? (
                    <input 
                        className={styles['todo_changed']} 
                        type='text' 
                        value={newTitle} 
                        onChange={onChangeTitle}
                    />
                ) : (
                    <div onClick={onHandleChanged}>{title}</div>
                )}
            </div>
            <div className={styles['buttons']}>
                {isChanged ? (
                    <button onClick={onSaveChanges}>Изменить</button> 
                ) : (
                    <button onClick={onTodoDelete}>Удалить</button>
                )}
            </div>
        </div>
    );
}

Todos.propTypes = {
    title: PropTypes.string,
    completed: PropTypes.bool,
    id: PropTypes.number
}