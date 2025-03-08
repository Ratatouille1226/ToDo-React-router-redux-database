//Шаблон запроса универсальный
const getDataFromServer = (method, { id, ...payload } = {}) => {
      let URL = 'http://localhost:3000/todos';
      let options = {
            method,
            headers: {'Content-Type': 'application/json'},
      }

      //Если метод не пост, добавляем id к ссылке, и настройку фетча вынесли в переменную потому что
      //js ругается на то, что у метода GET не должно быть поля body
      if (method === 'GET') {
            if (id) {
                  URL += `/${id}`;
            } else {
                  const { searchValue, isSort } = payload;
                  const sortParams = isSort ? '_sort=title&_order=asc' : '_sort=id&_order=desc'; //Для Сортировки и поиска (параметры с документации) сортировка на стороне сервера
                  URL += `?${sortParams}&title_like=${searchValue}`;
            }

      } else {
            if (method !== 'POST') {
                  URL += `/${id}`;
            }
      }
      
      if (method !== 'GET' && method !== 'DELETE') { 
            options.body = JSON.stringify(payload);   
      }

      return fetch(URL, options).then((dataTodo) => dataTodo.json())
};
//Создание новой задачи
export const createNewTodo = (newTodo) => getDataFromServer('POST', newTodo);
//Получение задачи
export const getNewTodo = (searchValue = '', isSort = false) => getDataFromServer('GET', { searchValue, isSort });
//Изменение задачи
export const updateTodo = (updateTodo) => getDataFromServer('PATCH', updateTodo);
//Удаление задачи
export const deleteTodo = (id) => getDataFromServer('DELETE', { id });

//Получение id одной задачи
export const readTodo = (id) => getDataFromServer('GET', { id });