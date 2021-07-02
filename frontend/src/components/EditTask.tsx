import { Dispatch, SetStateAction, FormEvent, useState } from "react";
import {
  Paper,
  Modal,
  Typography,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Switch,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Task from "./../interfaces/task";
import { Formik } from "formik";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import { validatonSchema } from "./../validations/taskForm";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import taskApi from "../Apis/taskApi";

const useStyles = makeStyles({
  modelContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  modelPaper: {
    display: "inline-block",
    width: "500px",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  formModelContainer: {
    margin: "1rem",
  },
  formContainer: {
    width: "100%",
    "& > div": {
      margin: ".6rem 0",
    },
  },
});

// Alert Notification Component
function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface PropType {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  task: Task;
  fetchAllData: () => void;
}

const EditTaskForm = ({ open, setOpen, task, fetchAllData }: PropType) => {
  const classes = useStyles();
  const [btnState, setBtnState] = useState({
    isLoading: false,
    message: "",
    type: "success",
  });
  const [showNotification, setShowNotification] = useState(false);
  const handleCloseNotification = (event: any, reason: string) => {
    if (reason === "clickaway") {
      return;
    }
    setShowNotification(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = (values: Task) => {
    setBtnState({ ...btnState, isLoading: true });
    taskApi.put("/api/v1/task", { query: { _id: task._id }, data: values })
      .then(res => {
        setBtnState({
          isLoading: false,
          message: "Task Edited Successfully",
          type: "success",
        });
        setShowNotification(true);
        fetchAllData();
      }).catch((err) => {
        setBtnState({
          isLoading: false,
          message: err.response ? err.response.data.message : err.message,
          type: "error",
        });
        setShowNotification(true);
      });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.modelContainer}>
        <Paper className={classes.modelPaper}>
          <div className={classes.formModelContainer}>
            <Typography variant="h6" component="h3" className={classes.title}>
              Edit Task
            </Typography>
            <Formik
              initialValues={task}
              onSubmit={handleSaveChanges}
              validationSchema={validatonSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <FormControl className={classes.formContainer}>
                  <TextField
                    label="Title of the task"
                    variant="outlined"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    error={!!(errors.title && touched.title)}
                    helperText={
                      !!(errors.title && touched.title) ? errors.title : ""
                    }
                  />
                  <TextField
                    label="Sub Title of the task"
                    variant="outlined"
                    type="text"
                    name="subTitle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subTitle}
                    error={!!(errors.subTitle && touched.subTitle)}
                    helperText={
                      !!(errors.subTitle && touched.subTitle)
                        ? errors.subTitle
                        : ""
                    }
                  />
                  <TextField
                    label="Description of the task"
                    variant="outlined"
                    type="text"
                    multiline
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={!!(errors.description && touched.description)}
                    helperText={
                      !!(errors.description && touched.description)
                        ? errors.description
                        : ""
                    }
                  />
                  <div>
                    <Typography variant="body1">Select Task Type</Typography>
                    <Select
                      labelId="taskType"
                      placeholder="Task Type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.type}
                      name="type"
                      aria-placeholder="Task Type"
                      style={{ width: "100%" }}
                    >
                      <MenuItem value="important">Important</MenuItem>
                      <MenuItem value="not-important">Not Important</MenuItem>
                      <MenuItem value="very-important">Very Important</MenuItem>
                    </Select>
                  </div>
                  <div>
                    <Typography variant="body1">Reminder Date Time</Typography>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <DateTimePicker
                        value={values.reminderDate}
                        onChange={(val) => {
                          if (val) {
                            handleChange("reminderDate")(val.toISOString());
                          }
                        }}
                        style={{ width: "100%" }}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <div>
                    <Typography variant="body1">Is completed ?</Typography>
                    <Switch
                      checked={values.isCompleted}
                      onChange={handleChange}
                      color="primary"
                      name="isCompleted"
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => handleSubmit(e as FormEvent<any>)}
                    disabled={btnState.isLoading}
                  >
                    Save Changes
                  </Button>
                </FormControl>
              )}
            </Formik>

            <Snackbar
              open={showNotification}
              autoHideDuration={5000}
              onClose={handleCloseNotification}
            >
              <Alert onClose={handleCloseNotification} severity={btnState.type}>
                {btnState.message}
              </Alert>
            </Snackbar>
          </div>
        </Paper>
      </div>
    </Modal>
  );
};

export default EditTaskForm;
