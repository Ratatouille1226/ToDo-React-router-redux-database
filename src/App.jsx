import { Route, Routes } from 'react-router-dom';

import { MainPage, TodoPage, NotFound } from './pages';

import styles from './App.module.css'


function App() {

      return (
        <div className={styles['app']}>
          <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/task' element={<TodoPage />} />
              <Route path='/task/:id' element={<TodoPage />} />
              <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      )
}

export default App
