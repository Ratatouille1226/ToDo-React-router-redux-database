import { useState } from 'react';
import styles from './Header.module.css';

export const Header = () => {
    const [isSort, setIsSort] = useState(false);
    const [value, setValue] = useState('');

    //Добавление задачи
    const onAddTodo = () => {

    }
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
                placeholder='Введите задачу' 
                value={value}
                onChange={onGetValueTodo}
            />
            <button onClick={onSortTodo}>{isSort ? "Откл. сортировку" : "Отсортировать"}</button>
            <button onClick={onAddTodo}>Добавить</button>
        </div>
    );
}