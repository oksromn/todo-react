import React from 'react';
import firebase from "./firebase";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";

function Todo() {

    const todo = useTodo();

    return (
        <>
            <div className='add-todo'>
                <AddTodo />
            </div>
            <div className='all-todo'>
                {todo.map( el => {
                    return <TodoItem todo={el} key={el.id}/>
                })}
            </div>
        </>
    )
}

const useTodo = () => {
    const [todo, setTodo] = React.useState([]);

    React.useEffect(() => {
        firebase.firestore()
            .collection('todos')
            .orderBy('done', 'asc')
            .orderBy('date', 'desc')
            .onSnapshot(snap => {
                const newTodo = snap.docs.map( doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTodo(newTodo)
            })
    }, []);
    return todo;
};

export default Todo;