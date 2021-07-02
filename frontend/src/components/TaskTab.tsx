import { Typography, IconButton, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Create";
import DoneIcon from "@material-ui/icons/Done";
import Task from "../interfaces/task";
import moment from "moment";
import { taskColors } from "./../helpers/colors";
import taskApi from "../Apis/taskApi";
import EditTask from "./EditTask";
import { useState, forwardRef } from "react";


const useStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "8px 1fr 150px",
    margin: ".3rem 0",
  },
  title: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: ".9rem",
    color: "#7E7E7E",
    fontWeight: "bold",
  },
  remiderDate: {
    fontSize: "0.8rem",
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
    marginRight: ".4rem",
  },
  iconButton: {
    display: "grid",
    placeContent: "center",
    margin: ".2rem",
  },
});

interface propType {
  task: Task;
  fetchAllData: () => void;
}

const handleTaskCompleted = (task: Task, fetchAllData: () => void): void => {
  if (task.isCompleted === false) {
    taskApi
      .put("/api/v1/task", {
        query: { _id: task._id },
        data: { isCompleted: true },
      })
      .then(() => {
        // refetch data
        fetchAllData();
      });
  }
};

const handleDeleteTask = (task: Task, fetchAllData: () => void): void => {
  taskApi
    .delete("/api/v1/task", { data: { query: { _id: task._id } } })
    .then(() => {
      console.log(task._id);
      // refetch data
      fetchAllData();
    });
};

const TaskTab = forwardRef(({ task, fetchAllData }: propType, ref) => {
  const classes = useStyles();
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);

  return (
    <>
      <Paper className={classes.container} ref={ref} >
        <div
          className={classes.type}
          style={{ backgroundColor: taskColors[task.type] }}
        ></div>
        <div className={classes.content}>
          <Typography
            className={classes.title}
            style={{
              textDecoration: task.isCompleted ? "line-through" : "none",
            }}
            variant="h3"
          >
            {task.title}
          </Typography>
          <Typography className={classes.subTitle} variant="body1">
            {task.subTitle}
          </Typography>
          <Typography className={classes.remiderDate} variant="body1">
            {moment(task.reminderDate).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </div>
        <div className={classes.iconContainer}>
          <Paper
            className={classes.iconButton}
            style={{ backgroundColor: "#1DD1A1" }}
            onClick={() => {
              handleTaskCompleted(task, fetchAllData);
            }}
          >
            {!task.isCompleted &&
            <IconButton disabled={task.isCompleted}>
              <DoneIcon />
            </IconButton>}
          </Paper>
          <Paper
            className={classes.iconButton}
            style={{ backgroundColor: "#FECA57" }}
          >
            <IconButton
              onClick={() => {
                setOpenEditForm(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Paper>
          <Paper
            className={classes.iconButton}
            style={{ backgroundColor: "#F53B57" }}
            onClick={() => {
              handleDeleteTask(task, fetchAllData);
            }}
          >
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Paper>
        </div>
      </Paper>
      <EditTask
        task={task}
        fetchAllData={fetchAllData}
        open={openEditForm}
        setOpen={setOpenEditForm}
      />
    </>
  );
});

export default TaskTab;
