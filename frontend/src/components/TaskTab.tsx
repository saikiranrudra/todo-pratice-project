import { Typography, IconButton } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";
import Task from "../interfaces/task";

const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "8px 1fr 150px",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: "1rem",
    color: "#7E7E7E",
    fontWeight: "bold",
  },
  remiderDate: {
    fontSize: "1rem",
    color: "#7E7E7E",
  },
  type: {
    backgroundColor: "#F53B57",
    borderRadius: "1rem",
  },
  content: {
    padding: "1rem .8rem",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: ".4rem"
  },
  iconButton: {
    display: "grid",
    placeContent: "center",
    margin: ".2rem",
  },
});

interface propType {
  task: Task
}

const TaskTab = ({ task }: propType) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      <div className={classes.type}></div>
      <div className={classes.content}>
        <Typography className={classes.title} variant="h3">
          {task.title}
        </Typography>
        <Typography className={classes.subTitle} variant="body1">
          {task.subTitle}
        </Typography>
        <Typography className={classes.remiderDate} variant="body1">
          {task.reminderDate.toUTCString()}
        </Typography>
      </div>
      <div className={classes.iconContainer}>
        <Paper
          className={classes.iconButton}
          style={{ backgroundColor: "#1DD1A1" }}
        >
          <IconButton>
            <DoneIcon />
          </IconButton>
        </Paper>
        <Paper
          className={classes.iconButton}
          style={{ backgroundColor: "#FECA57" }}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
        </Paper>
        <Paper
          className={classes.iconButton}
          style={{ backgroundColor: "#F53B57" }}
        >
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Paper>
      </div>
    </Paper>
  );
};



export default TaskTab;
