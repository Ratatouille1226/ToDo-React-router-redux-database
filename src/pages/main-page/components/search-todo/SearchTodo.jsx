import { useState, useRef } from 'react';
import styles from '../../../../components/header/Header.module.css'
import { Debounce } from '../../../../utils';

export const SearchTodo = ({ onSearch }) => {
    const [value, setValue] = useState('');

    const debouncedOnSearch = useRef(Debounce(onSearch, 1000)).current; //Сделано через реф чтобы не создавались много дебаунсов и не отменяли друг друга

    const onSubmit = (event) => {
        event.preventDefault();
        onSearch(value);
    }

    const onChange = ({ target }) => {
        setValue(target.value);
        debouncedOnSearch(target.value)
    }

    return (
        <form className={styles['block_search']} onSubmit={onSubmit}>
            <input 
            className={styles['input_value-search']} 
            type='text' 
            placeholder='Найти задачу...' 
            value={value}
            onChange={onChange}
            />
            <button type="submit">Поиск</button>
        </form>
    )
}