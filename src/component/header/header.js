import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

//let toDo = ["task 1"];

class Task {
    constructor(name, date) {
        this.name = name;
        this.date = date;
    }
}

function Header() {
    return <header><h1>To Do:</h1></header>
}

function TaskField() {
    return (
        <TextField
            variant="outlined"
            id="new-item-input"
            label="What do you need to do?"
            name="new-item-input"
        />
    );
}

function AddTask() {
    function foo(taskName) {
        let toDo = document.querySelector("#to-do-list").toDo;
        const alterToDo = document.querySelector("#to-do-list").alterToDo;
        let now = new Date();
        let task = new Task(taskName, now);
        let toDoNames = toDo.map(eachTask => eachTask.name);
        if (!toDoNames.includes(taskName)) {
            // Need to change value of toDo!
            //toDo.push(task);
            //toDo.join([task])
            toDo.alterToDo(["test"]);//toDo.join([new Task(taskName, now)]));
            console.log(toDo);
        }
    }

    return (
        <Button
            onClick={() => { foo(document.querySelector("#new-item-input").value) }}
            variant="contained"
            name="new-item-button"
        >
            Add Task
        </Button>
    );
}

function AddTaskForm() {
    return (
        <Grid container spacing={1} justify="center">
            <TaskField id="new-item-input"/><AddTask id="new-item-button"/>
        </Grid>
    );
}

function ToDoList(props) {
    const [toDo, alterToDo] = useState(["task 1"]);
    
    const [checked, setChecked] = useState([0]);
    const handleToggle = (value) => () => {
        const idx = checked.indexOf(value);
        const newChecked = [...checked];
        if (idx === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(idx, 1);
        }
        setChecked(newChecked);
    }

    return (
        <React.Fragment>
            <List>
                {toDo.map((value) => {
                    const labelId = `list-item-${value}`;
                    return (
                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value}`} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit">
                                    <EditIcon/>
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </React.Fragment>
    );
}

export { Header, AddTaskForm, ToDoList }