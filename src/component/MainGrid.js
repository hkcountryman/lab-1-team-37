import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MainBox from "./MainBox";
import StatusBar from "./StatusBar";
import { version } from "react-dom";

// STYLING
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "90rem",
    height: "42rem",
    marginTop: "2rem",
    margin: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    height: "38rem",
    color: theme.palette.text.secondary,
    backgroundColor: "#264653",
    borderRadius: "0rem",
    overflow: "hidden",
  },
  greeting: {
    paddingBottom: "1rem",
  },
}));

let curId = 0;
class Task {
  /* someone remind me to make a default value for category because I might die if I
     have to continue using this language without every conceivable type hint. It's
     going to be an as yet undefined object though so I still have to think about it.
  */
  constructor(title = "Do homework", category, isDone) {
    this.title = title;
    this.category = category;
    this.id = curId;
    curId = curId + 1;
    this.done = isDone;
    let newDate = new Date();
    this.date = newDate;
  }
}

// EXPORT
export default function MainGrid() {
  const classes = useStyles();

  // TODO: Decide if we want to include this or not in the final version
  // Though we don't want to force `to-do list items` on the user, I feel like our strength
  // is having the extra feature providing insight on how we value certain categories
  // through the number of tasks we have in each one and our progress in each category.
  // My 2 cents: let's keep them but provide users with a handy "delete all" button?
  const [allEntries, setAllEntries] = useState([
    new Task("Do homework", "school", true),
    new Task("Eat dinner", "self-care", true),
    new Task("Spend time with family", "social", false),
    new Task("Watch a movie", "other", true),
    new Task("Listen to music", "other", false),
    new Task("Do the dishes", "chores", false),
    new Task("Cook breakfast", "chores", true),
    new Task("Go to work", "work", true),
    new Task("Sleep in", "self-care", true),
    new Task("Go for a walk", "self-care", false),
    new Task("Have lunch with friends", "social", false),
    new Task("Review for exam", "school", false),
  ]);

  const handleAdd = (obj) => {
    console.log("I got it!");
    var newState = [];

    // Copy old entries over
    allEntries.map((_value) => {
      newState.push(_value);
    });

    // Push new entry obj
    newState.push(new Task(obj.title, obj.category, false));

    // Update state
    setAllEntries(newState);
  };

  const handleToggle = (value) => () => {
    var newState = [];
    allEntries.map((_value) => {
      if (_value.id === value.id) {
        _value.done = !_value.done;
      }
      newState.push(_value);
    });
    setAllEntries(newState);
  };

  // const remotelyS

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {/* This one's the big box that will contain our to-do list! */}
        <Grid item xs>
          <Paper className={classes.paper}>
            {/* This component is what actually houses the to-do list
            and manages the state of the list. */}
            <MainBox
              remotelyHandleToggle={handleToggle}
              listOfEntries={allEntries}
              remotelyHandleAdd={handleAdd}
            />
            {/* Notice the props we passed to the `TabPanel` component.
            We'll have to do something similar to `remotelyHandleToggle` for all other list functions! */}
          </Paper>
        </Grid>
        {/* This is the smaller box to the side that we can use for adding more things. */}
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <StatusBar listOfEntries={allEntries} />
            {/* We need the list of entries inside StatusBar too, so we're passing it as props. */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
