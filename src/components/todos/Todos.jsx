
import styles from './Todos.module.css';
import PropTypes from 'prop-types';

export const Todos = ({ title, completed, isChanged, onSaveChanges, onTodoDelete, onTitleChange, onHandleChanged }) => {

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
                        value={title} 
                        onChange={({ target }) => onTitleChange(target.value)}
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