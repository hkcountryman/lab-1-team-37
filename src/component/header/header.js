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

/**
 * It's a task with a date.
 */
class Task {
    /**
     * Constructor!
     * 
     * @param {string} name the task name
     * @param {Date} date current date
     */
    constructor(name, date) {
        this.name = name;
        this.date = date;
    }

    /**
     * String representation of the thing
     * 
     * @returns not [object object]
     */
    toString() {
        return this.date.toDateString() + ": " + this.name;
    }
}

/**
 * Returns a title for my sexy web app
 * 
 * @returns a title for my sexy web app
 */
function Header() {
    return <header><h1>To Do:</h1></header>
}

/**
 * Lol this one isn't nested in the next one what am I doing. It makes the text box to type a task.
 */
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

/**
 * To do list containing a text field and button to add new tasks.
 * 
 * @returns a to do list that can be checked to mark it complete but the edit and delete buttons don't work
 */
function ToDoList() {
    const [toDo, alterToDo] = useState([new Task("task 1", new Date())]);
    
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

    /**
     * Makes a button that adds a new task.
     * 
     * @returns the button to add the new task, unless the task is already in the list
     */
    function AddTask() {
        /**
         * Alters the list unless altering it is stupid because it already has the thing on it
         * is this how I do javadocs but for javascript
         * is the {} for type hints or what???? :(
         * 
         * @param {string} taskName the name of the task
         */
        function foo(taskName) {
            let now = new Date();
            let task = new Task(taskName, now);
            let toDoNames = toDo.map(eachTask => eachTask.name);
            if (!toDoNames.includes(taskName)) {
                alterToDo(toDo.concat([task]));
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

    /**
     * Smooshes the text field and button into one component to slightly modularize this function that has too many nested functions in it
     * 
     * @returns a text field and button
     */
    function AddTaskForm() {
        return (
            <Grid container spacing={1} justify="center">
                <TaskField id="new-item-input"/><AddTask id="new-item-button"/>
            </Grid>
        );
    }

    return (
        <React.Fragment>
            <AddTaskForm/>
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

export { Header, ToDoList }