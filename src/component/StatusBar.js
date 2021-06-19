import React from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { Tooltip } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";

// STYLING
// TODO: We need to change the colors of each of the bars that represent a different category.
// Color-coding may help a ton with better understanding the data! However, if these are color-coded,
// it must match with the icon colors to be implemented in the individiual to-do list entries
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "#00bcd4",
  },
  tooltip: {
    backgroundColor: "#00bcd4",
    fontSize: "1rem",
    color: "black",
    fontWeight: "bold",
  },
}));

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        {...props}
        style={{ color: "#e91e63" }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          style={{ color: "white" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

function ProgressTooltip(props) {
  const classes = useStylesBootstrap();
  return <Tooltip arrow classes={classes} {...props} />;
}

const StyledLinearProgress = withStyles({
  root: {
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#e91e63",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#e91e63",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#e91e63",
    },
    "& .MuiLinearProgress-dashedColorPrimary": {
      backgroundImage: "radial-gradient(#00bcd4 5%, transparent 20%)",
    },
  },
})(LinearProgress);

const CategoryLabel = withStyles({
  root: {
    color: "white",
    textAlign: "left",
  },
  textColor: "white",
})(Typography);

// EXPORT
export default function StatusBar(props) {
  // The copy of allEntries that we get is from `MainGrid.js`, the true and only copy
  const allEntries = props.listOfEntries;

  // Logic for calculating progress bar values

  var WorkTotal = 0;
  var SchoolTotal = 0;
  var SelfCareTotal = 0;
  var HobbiesTotal = 0;
  var SocialTotal = 0;
  var ChoresTotal = 0;

  allEntries.forEach((entry) => {
    console.log(entry);
    if (entry.category === "work") WorkTotal++;
    if (entry.category === "school") SchoolTotal++;
    if (entry.category === "self-care") SelfCareTotal++;
    if (entry.category === "hobbies") HobbiesTotal++;
    if (entry.category === "social") SocialTotal++;
    if (entry.category === "chores") ChoresTotal++;
  });

  const AllTotal =
    WorkTotal +
    SchoolTotal +
    SelfCareTotal +
    HobbiesTotal +
    SocialTotal +
    ChoresTotal;

  var WorkDone = 0;
  var SchoolDone = 0;
  var SelfCareDone = 0;
  var HobbiesDone = 0;
  var SocialDone = 0;
  var ChoresDone = 0;

  allEntries.forEach((entry) => {
    if (entry.done === true && entry.category === "work") WorkDone++;
    if (entry.done === true && entry.category === "school") SchoolDone++;
    if (entry.done === true && entry.category === "self-care") SelfCareDone++;
    if (entry.done === true && entry.category === "hobbies") HobbiesDone++;
    if (entry.done === true && entry.category === "social") SocialDone++;
    if (entry.done === true && entry.category === "chores") ChoresDone++;
  });

  var WorkProgress = 0;
  var SchoolProgress = 0;
  var SelfCareProgress = 0;
  var HobbiesProgress = 0;
  var SocialProgress = 0;
  var ChoresProgress = 0;

  if (WorkTotal !== 0) WorkProgress = (WorkDone / WorkTotal) * 100;

  if (SchoolTotal !== 0) SchoolProgress = (SchoolDone / SchoolTotal) * 100;

  if (SelfCareTotal !== 0)
    SelfCareProgress = (SelfCareDone / SelfCareTotal) * 100;

  if (HobbiesTotal !== 0) HobbiesProgress = (HobbiesDone / HobbiesTotal) * 100;

  if (SocialTotal !== 0) var SocialProgress = (SocialDone / SocialTotal) * 100;

  if (ChoresTotal !== 0) var ChoresProgress = (ChoresDone / ChoresTotal) * 100;

  // This uses circular progress components to make it easier for users to
  // see which categories they tend to focus on the most (theoretically)
  // *note that this section does not take into account completion statuses
  function InsightsCard() {
    return (
      <>
        <Typography style={{ fontWeight: "bold" }}>
          Category Distribution
        </Typography>
        {/* TODO: This br makes me feel uncomfortable, but for some reason adding margins to the grid did not work.
        Any thoughts on possible alternatives? */}
        <br />
        <Grid container spacing={3} backgroundColor="blue">
          <Grid item xs={0}></Grid>
          <Grid item xs={0}>
            <CircularProgressWithLabel
              variant="determinate"
              value={(WorkTotal / AllTotal) * 100}
            />
            <CircularProgressWithLabel
              variant="determinate"
              value={(SchoolTotal / AllTotal) * 100}
            />
            <CircularProgressWithLabel
              variant="determinate"
              value={(SelfCareTotal / AllTotal) * 100}
            />
            <CircularProgressWithLabel
              variant="determinate"
              value={(HobbiesTotal / AllTotal) * 100}
            />
            <CircularProgressWithLabel
              variant="determinate"
              value={(SocialTotal / AllTotal) * 100}
            />
            <CircularProgressWithLabel
              variant="determinate"
              value={(ChoresTotal / AllTotal) * 100}
            />
          </Grid>
        </Grid>
        <br />
        <Paper variant={"elevation"} square={true} elevation={5} margin={0}>
          {/* TODO: we can change this text based on how balanced the distribution of the user's tasks are 
          ex: if they focus on one category alone for 80% of their tasks, we can say something like
          "There is definite room for improvement!" */}
          <Typography variant="h6">Balance is key!</Typography>
        </Paper>
      </>
    );
  }

  // Think about how MainGrid.js will be keeping track of progress
  // If there are n categories we need n progress bars
  // Progress can be set by either number of items on list or if we later implement time for each item

  // Basic example, four categories: Work, School, Self Care, Hobbies
  // User must choose category when adding item
  // Progress is calculated by number of items of each category, not time

  // TODO: We can potentially automate the creation of these sections for each category.
  // Though this works fine as is, it would look a lot cleaner if we made a generator of some sort
  return (
    <div>
      <Typography style={{ fontWeight: "bold", padding: 0, margin: 0 }}>
        Task Completion by Category
      </Typography>
      <ProgressTooltip title={WorkDone + "/" + WorkTotal} placement="left">
        <Box m={3}>
          <CategoryLabel variant="h6" component="h2" gutterBottom>
            Work
          </CategoryLabel>
          <StyledLinearProgress
            value={WorkProgress}
            variant={"buffer"}
            valueBuffer={0}
          />
        </Box>
      </ProgressTooltip>
      <ProgressTooltip title={SchoolDone + "/" + SchoolTotal} placement="left">
        <Box m={3}>
          <CategoryLabel
            variant="h6"
            component="h2"
            gutterBottom
            color="textSecondary"
          >
            School
          </CategoryLabel>
          <StyledLinearProgress
            value={SchoolProgress}
            variant={"buffer"}
            valueBuffer={0}
          />
        </Box>
      </ProgressTooltip>
      <ProgressTooltip
        title={SelfCareDone + "/" + SelfCareTotal}
        placement="left"
      >
        <Box m={3}>
          <CategoryLabel
            variant="h6"
            component="h2"
            gutterBottom
            color="Primary"
          >
            Self Care
          </CategoryLabel>
          <StyledLinearProgress
            value={SelfCareProgress}
            variant={"buffer"}
            valueBuffer={0}
          />
        </Box>
      </ProgressTooltip>
      <ProgressTooltip
        title={HobbiesDone + "/" + HobbiesTotal}
        placement="left"
      >
        <Box m={3}>
          <CategoryLabel variant="h6" component="h2" gutterBottom>
            Hobbies
          </CategoryLabel>
          <StyledLinearProgress
            value={HobbiesProgress}
            variant={"buffer"}
            valueBuffer={0}
          />
        </Box>
      </ProgressTooltip>
      <ProgressTooltip title={SocialDone + "/" + SocialTotal} placement="left">
        <Box m={3}>
          <CategoryLabel variant="h6" component="h2" gutterBottom>
            Social
          </CategoryLabel>
          <StyledLinearProgress
            value={SocialProgress}
            variant={"buffer"}
            valueBuffer={0}
          />
        </Box>
      </ProgressTooltip>
      <ProgressTooltip title={ChoresDone + "/" + ChoresTotal} placement="left">
        <Box m={3}>
          <CategoryLabel variant="h6" component="h2" gutterBottom>
            Chores
          </CategoryLabel>
          <StyledLinearProgress
            value={ChoresProgress}
            variant={"buffer"}
            valueBuffer={0}
          />
        </Box>
      </ProgressTooltip>
      <InsightsCard />
    </div>
  );
}