import { useState } from 'react';
import styles from './Header.module.css';

export const Header = ({ onTodoAdd }) => {
    const [isSort, setIsSort] = useState(false);
    const [value, setValue] = useState('');

    //Сортировка задач
    const onSortTodo = () => {

    }
    //Запись задачи в стейт
    const onGetValueTodo = ({ target }) => {
        setValue(target.value);
    }

    return (
        <div className={styles['header']}>
            <input 
                className={styles['input_value-search']} 
                type='text' 
                placeholder='Найти задачу...' 
                value={value}
                onChange={onGetValueTodo}
            />
            <button onClick={onSortTodo}>{isSort ? "Откл. сортировку" : "Отсортировать"}</button>
            <button onClick={onTodoAdd}>Добавить</button>
        </div>
    );
}