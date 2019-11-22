import React from 'react'
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import firebase from "firebase";
import DeleteTodo from "./DeleteTodo";
import PropTypes from 'prop-types';

function TodoItem( props ) {

    const [paperStyle, setPaperStyle] = React.useState({backgroundColor: '#ca668b'});

    React.useEffect(() => {
        setPaperStyle({backgroundColor:
                (props.todo.done
                    ? '#484848'
                    : '#3e86c3'
                )});
    }, [props.todo.done]);

    const handlerCheck = () => {
        firebase.firestore()
            .collection('todos')
            .doc(props.todo.id)
            .set({
                item: props.todo.item,
                date: props.todo.date,
                done: !props.todo.done
            })
    };

    return (
        <div className='todo-item'>
            <Paper style={paperStyle}>
                <Grid container spacing={1}>

                    <Grid item xs={2} className='check'>
                        <Checkbox
                            onChange={handlerCheck}
                            checked={props.todo.done} />
                    </Grid>
                    <Grid item xs={5} className='item'>
                        <strong> {props.todo.item} </strong>
                    </Grid>
                    <Grid item xs={3} className='date'>
                        <span> {props.todo.date} </span>
                    </Grid>
                    <Grid item xs={1}>
                        <DeleteTodo todo={props.todo}/>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    )
}

export default TodoItem;

TodoItem.propTypes = {
    todo: PropTypes.shape({
        item: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        done: PropTypes.bool.isRequired
    })
};