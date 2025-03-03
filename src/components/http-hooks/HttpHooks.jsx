//Шаблон запроса универсальный
const getDataFromServer = (method, { id, ...payload } = {}) => {
      let URL = 'http://localhost:3000/todos';
      let options = {
            method,
            headers: {'Content-Type': 'application/json'},
      }

      //Если метод не гет и не пост, добавляем id к ссылке, и настройку фетча вынесли в переменную потому что
      //js ругается на то, что у метода GET не должно быть поля body
      if (method !== 'GET' && method !== 'POST') {
            URL += `/${id}`;
      };

      if (method !== 'GET' && method !== 'DELETE') {
            options.body = JSON.stringify(payload);   
      }

      return fetch(URL, options).then((dataTodo) => dataTodo.json())
};
//Создание новой задачи
export const createNewTodo = (newTodo) => getDataFromServer('POST', newTodo);
//Получение задачи
export const getNewTodo = () => getDataFromServer('GET');
//Изменение задачи
export const updateTodo = (updateTodo) => getDataFromServer('PATCH', updateTodo);
//Удаление задачи
export const deleteTodo = (deleteTodo) => getDataFromServer('DELETE', { id: deleteTodo });