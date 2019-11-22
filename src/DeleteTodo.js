import React from 'react';
import Checkbox from "@material-ui/core/Checkbox";
import firebase from "firebase";
import PropTypes from "prop-types";

function DeleteTodo( props ) {

    const handlerDelete = () => {
        console.log(props.todo);

        firebase.firestore()
            .collection('todos')
            .doc(props.todo.id)
            .delete()
    };

    return (
        <Checkbox
            indeterminate
            onChange={handlerDelete}
        />
    )
}

export default DeleteTodo;

DeleteTodo.propTypes = {
    todo: PropTypes.shape({
        item: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired
    })
};
