import React from 'react';
import TextField from '@material-ui/core/TextField';
import firebase from "firebase";

function AddTodo() {

    const [todo, setTodo] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    const handlerSubmit = e => {
        e.preventDefault();

        firebase.firestore()
            .collection('todos')
            .add({
                item: todo,
                date: new Date().toLocaleString(),
                done: false
            }).then( () => {
            setTodo('')
        });

        setInputValue('');
    };

    const handlerInput = e => {
        setTodo(e.currentTarget.value);
        setInputValue(e.currentTarget.value);
    };


    return (
        <form onSubmit={handlerSubmit}>
            <TextField
                id="standard-basic"
                label="Add Record"
                margin="normal"
                onChange={e => handlerInput(e)}
                value={inputValue}
            />
        </form>
    );
}

export default AddTodo;