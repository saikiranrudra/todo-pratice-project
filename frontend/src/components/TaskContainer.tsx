import { CSSProperties } from "react";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TaskTab from "./TaskTab";

// interfaces
import Task from "./../interfaces/task";

const useStyles = makeStyles({
  containerTitle: {
    color: "#F53B57",
    margin: ".6rem .8rem",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  container: {
    padding: ".6rem .6rem",
  },
});

interface propType {
  title: string;
  tasks: Task[];
  style?: CSSProperties;
}

const TaskContainer = (props: propType) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container} style={props.style} >
      <Typography variant="h6" className={classes.containerTitle}>
        {props.title}
      </Typography>
      <div>
        <TaskTab
          task={{
            title: "Task Title",
            type: "important",
            subTitle: "subTitle",
            description: "description",
            reminderDate: new Date(),
            _id: "54das5d46as5d",
          }}
        />
      </div>
    </Paper>
  );
};

export default TaskContainer;
