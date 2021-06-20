import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import { Avatar, FormControl, InputLabel, ListItemAvatar, MenuItem } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";


// STYLING
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "40ch",
      textAlign: "left",
      justifyContent: "left",
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fabRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  catSelect: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));

function CategorySelect() {
  const classes = useStyles();

  // category is "chores", "school", "self-care", "social", "work", or "other"
  const [category, setCategory] = React.useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  }

  return (
    <FormControl variant="outlined" className={classes.catSelect}>
      <InputLabel id="category-selection-label">Category</InputLabel>
      <Select
        labelId="category-selection-label"
        id="category-selection"
        value={category}
        onChange={handleCategoryChange}
      >
        <MenuItem value={"chores"}>Chores</MenuItem>
        <MenuItem value={"school"}>School</MenuItem>
        <MenuItem value={"self-care"}>Self-care</MenuItem>
        <MenuItem value={"Social"}>Social</MenuItem>
        <MenuItem value={"work"}>Work</MenuItem>
        <MenuItem value={"other"}>Other</MenuItem>
      </Select>
    </FormControl>
  )
}
// EXPORT
export default function BasicTextFields() {
  const classes = useStyles();

  // ***For Lauren***
  // Just a basic text field and add button to get you started. Feel free to style it as you'd like!
  // List state is stored inside of MainGrid.js, so you'll need to make your DeleteFunction there
  // Because the file structure is MainGrid.js > TabPanel.js > BasicTextField, you'll need to pass
  // the function as a prop down more than once!

  return (
    
  <form className={classes.root} noValidate autoComplete="off">
    <Toolbar style={{ width: "100%" }}>
      <Grid container spacing={5}>
        <Grid item>
          <TextField
            data-testid="new-item-input"
            id="standard-basic"
            label="I need to..."
            color="secondary"
            inputProps={{
              style: {
                textAlign: "left",
                verticalAlign: "center",
                width: "36rem",
              },
            }}
          />
        </Grid>
        <Grid item>
          <CategorySelect/>
        </Grid>
        <Grid item className={classes.fabRoot}>
          <div>
            <Fab
              data-testid="new-item-button"
              color="primary"
              aria-label="add"
              variant="extended">
                <AddIcon
                  onClick={() => {
                    alert("Ability to add entry is not yet functional");
                  }}
                />
            </Fab>
          </div>
        </Grid>
      </Grid>
    </Toolbar>
  </form>
  );
}
