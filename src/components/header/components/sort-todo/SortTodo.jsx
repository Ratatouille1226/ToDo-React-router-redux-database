import { useState } from "react"

export const SortTodo = ({ onSort }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    const onChange = () => {
        setIsEnabled(state => !state);
        onSort(isEnabled);
    }

    return (
            <button onClick={onChange} >{isEnabled ? "Выкл. Сортировку" : "Отсортировать"}</button>
    )
}