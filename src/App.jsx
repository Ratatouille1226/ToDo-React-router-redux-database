import { useState, useEffect } from 'react'

import { Todos, Header } from './components';
import { getNewTodo } from './components/http-hooks';

import styles from './App.module.css'

function App() {
  const [todo, setTodo] = useState([]);
  //Получаем список дел
  useEffect(() => {
    getNewTodo().then(setDataTodo => setTodo(setDataTodo))
  }, []);

  return (
    <div className={styles['app']}>
      <Header />
      {todo.map(({ id, title, completed }) => (
        <Todos 
            key={id} 
            title={title} 
            completed={completed}
            id={id}
        />
      ))}
    </div>
  )
}

export default App
