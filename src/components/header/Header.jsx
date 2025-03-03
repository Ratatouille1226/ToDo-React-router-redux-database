
import { SearchTodo, SortTodo } from './components/index';
import styles from './Header.module.css';

export const Header = ({ onTodoAdd, onSearch, onSort }) => {


    return (
        <div className={styles['header']}>
            <SearchTodo onSearch={onSearch}/>
            <SortTodo onSort={onSort}/>
            <button onClick={onTodoAdd}>Добавить</button>
        </div>
    );
}