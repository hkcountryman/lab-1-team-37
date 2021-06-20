import PropTypes from "prop-types";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import { green, red } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { indigo, orange, pink, cyan } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";
import { fontWeight } from "@material-ui/system";
import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BasicTextField from "./BasicTextField";
import { Chip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GroupIcon from "@material-ui/icons/Group";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";
import { getByDisplayValue } from "@testing-library/react";

const categoryColors = {
  chores: "#540d6e",
  other: "#5967ff",
  school: "#3bceac",
  "self-care": "#ee4266",
  social: "#ffd23f",
  work: "#403d39",
};

function getCategoryIcon(value) {
  if (value.category === "chores") {
    return <DoneIcon style={{ color: categoryColors["chores"] }} />;
  } else if (value.category === "school") {
    return <SchoolIcon style={{ color: categoryColors["school"] }} />;
  } else if (value.category === "self-care") {
    return <FavoriteIcon style={{ color: categoryColors["self-care"] }} />;
  } else if (value.category === "social") {
    return <GroupIcon style={{ color: categoryColors["social"] }} />;
  } else if (value.category === "work") {
    return <WorkIcon style={{ color: categoryColors["work"] }} />;
  } else {
    // other
    return <EmojiEmotionsIcon style={{ color: categoryColors["other"] }} />;
  }
}

// Each new instantiated Task increments curId by one:
let curId = 0;
class Task {
  /**
   * Creates a Task object given the name of the task (any string) and the name
   * of its category (strings from a predetermined set: "work", "school","chores",
   * "self-care", "social", and "other").
   *
   * @param {string} title the name of the task that appears in the list
   * @param {string} category the name of the task category
   */
  constructor(title = "Do homework", category) {
    this.title = title;
    this.category = category;
    this.id = curId;
    curId = curId + 1;
    this.done = false;
    // optional: this.date = new Date() if anyone wants encapsulation of the date
  }
}

// This overrides the default MUI theme colors.
const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: pink[500],
    },
  },
});

// STYLING
const useStyles = makeStyles((theme) => ({
  listItem: {
    color: theme.palette.secondary,
  },
  root: {
    backgroundColor: "transparent",
    width: "100%",
    position: "relative",
    height: "100%",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[600],
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

export default function MainBox(props) {
  const classes = useStyles();
  const theme = useTheme();

  // STATE
  const [value, setValue] = React.useState(0);
  var allEntries = props.listOfEntries; // We receive the list of all to-do list entries from MainGrid.js. Props are useful!

  // FUNCTIONS (no need to edit these ones in particular)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  // FAB stands for Floating Action Buttton. This is how they are currently styled.
  // Notice we only see the `Add` fab. The others can be made visible
  // by uncommenting some parts below.
  const fabs = [
    {
      color: "primary",
      className: classes.fab,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "secondary",
      className: classes.fab,
      icon: <EditIcon />,
      label: "Edit",
    },
    {
      color: "inherit",
      className: clsx(classes.fab, classes.fabGreen),
      icon: <UpIcon />,
      label: "Expand",
    },
  ];

  const formatDate = (date) => {
    let period = "AM";
    let hour = date.getHours();
    if (hour == 12) {
      period = "PM";
    } else if (hour > 12) {
      hour = hour - 12;
      period = "PM";
    }

    let minute = date.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }

    return (
      date.getMonth() +
      "/" +
      date.getDay() +
      "/" +
      date.getYear().toString().substring(1) +
      " " +
      hour +
      ":" +
      minute +
      " " +
      period
    );
  };

  const CheckboxListSecondary = () => {
    return (
      <Paper>
        <List
          MenuProps={{ autoFocus: false }}
          dense
          className={classes.root}
          style={{ width: "100%", maxHeight: "20rem", overflowY: "auto" }}
        >
          {allEntries.map((value) => {
            const labelId = `checkbox-list-secondary-label-${value.id}`;

            // This dictates what appears in each list entry!
            return (
              <ListItem
                className={classes.listItem}
                key={value.id}
                disabled={false}
                style={{
                  width: "100%",
                  height: "5rem",
                  // Opacity changes when the item is marked as complete.
                  opacity: value.done === false ? 1 : 0.5,
                }}
              >
                <IconButton
                  aria-label="delete"
                  color="primary"
                  onClick={() => {
                    // ***For Lauren***
                    // It should be fairly convenient to use `value` and `allEntries`
                    // You will need to make a DeleteEntry function though inside MainGrid.js,
                    // pass it down as a prop, and call it here! Feel free to edit the style of the icon button, etc.
                    alert("Ability to delete is not yet functional");
                  }}
                >
                  <DeleteIcon />
                </IconButton>

                {/* Displays an avatar. Maybe we can replace this with an icon later,
                depending on what they categorize the task as? */}
                <ListItemIcon>
                  <Icon>{getCategoryIcon(value)}</Icon>
                </ListItemIcon>

                {/* This would be a great place to display the date and time of list entry creation. 
                It may be referenced `value.creationTime` after implementation. */}
                <Chip
                  label={formatDate(value.date)}
                  color="secondary"
                  style={{ marginRight: "1rem", width: "auto" }}
                />

                {/* Displays name (title) of task. */}
                <ListItemText id={labelId} primary={value.title} />

                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => {
                    // ***For Rachel***
                    // It should be fairly convenient to use `value` and `allEntries`
                    // You will need to make an EditEntry function though inside MainGrid.js,
                    // pass it down as a prop, and call it here! Feel free to edit the style of the icon button, etc.
                    alert("Ability to edit is not yet functional");
                  }}
                >
                  <EditIcon />
                </IconButton>

                {/* Checkbox components; shows task status. */}
                <ListItemSecondaryAction>
                  <Checkbox
                    edge="end"
                    onChange={props.remotelyHandleToggle(value)}
                    checked={value.done !== false}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
            // End of list entry display ^
          })}
        </List>
      </Paper>
    );
  };

  return (
    <ThemeProvider theme={customTheme}>
      <div className={classes.root}>
        <AppBar style={{ background: "white" }} position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab
              style={{
                backgroundColor: "#264653",
                fontWeight: "bold",
                fontSize: "3rem",
              }}
              label="NOW"
              {...a11yProps(0)}
            ></Tab>

            {/* So these allow there to be multiple tabs in this grid box.
            Try uncommenting below. It's pretty cool! 😎 As it adds more complexity,
            we probably shouldn't worry about doing anything with it right now. */}

            {/* <Tab
              style={{
                backgroundColor: "#264653",
                fontWeight: "bold",
                fontSize: "3rem",
              }}
              label="SOON"
              {...a11yProps(1)}
            />
            <Tab
              style={{
                backgroundColor: "#264653",
                fontWeight: "bold",
                fontSize: "3rem",
              }}
              label="LATER"
              {...a11yProps(2)}
            /> */}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            style={{ width: "100%" }}
          >
            {/* Contents of tab 1. */}
            <Paper
              style={{
                // backgroundColor: "red",
                width: "100%",
                margin: 0,
                padding: 0,
              }}
            >
              {CheckboxListSecondary()}
            </Paper>
            <Paper
              elevation={5}
              style={{
                marginTop: "1rem",
                alignContent: "left",
                justifyContent: "left",
                width: "100%",
                marginLeft: "0rem",
              }}
            >
              <BasicTextField
                listOfEntries={props.listOfEntries}
                remotelyHandleAdd={props.remotelyHandleAdd}
              />
            </Paper>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            {/* Contents of tab 2. */}
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            {/* Contents of tab 3. */}
            Item Three
          </TabPanel>
        </SwipeableViews>
      </div>
    </ThemeProvider>
  );
}
