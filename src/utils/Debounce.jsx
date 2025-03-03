
export const Debounce = (fn, delay) => {
    let timerId;

    return (...args) => {
        clearTimeout(timerId); //Очищаем тайм аут если функция ещё не выполнилась
        timerId = setTimeout(fn, delay, ...args);
    }
}