import { useState, FormEvent } from "react";
import {
  Typography,
  TextField,
  Select,
  Button,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { Formik } from "formik";
import {
  inititalValues,
  validatonSchema,
  FormType,
} from "./../validations/taskForm";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import taskApi from "../Apis/taskApi";

const useStyles = makeStyles({
  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
    "& > div": {
      margin: ".6rem 0",
    },
  },
  formModelContainer: {
    margin: "1rem",
  },
});

// Alert Notification Component
function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CreateTaskForm = ({ fetchAllData }: { fetchAllData: () => void }) => {
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

  const createTaskHandle = (values: FormType) => {
    setBtnState({ ...btnState, isLoading: true });
    taskApi
      .post("/api/v1/task", values)
      .then(() => {
        setBtnState({
          isLoading: false,
          message: "Task Created Successfully",
          type: "success",
        });
        setShowNotification(true);
        fetchAllData();
      })
      .catch((err) => {
        setBtnState({
          isLoading: false,
          message: err.response ? err.response.data.message : err.message,
          type: "error",
        });
        setShowNotification(true);
      });
  };

  return (
    <div className={classes.formModelContainer}>
      <Typography variant="h6" component="h3" className={classes.title}>
        Create Task
      </Typography>
      <Formik
        initialValues={inititalValues}
        onSubmit={createTaskHandle}
        validationSchema={validatonSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
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
              helperText={!!(errors.title && touched.title) ? errors.title : ""}
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
                !!(errors.subTitle && touched.subTitle) ? errors.subTitle : ""
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

            <br />

            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleSubmit(e as FormEvent<any>)}
            >
              Create Task
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginTop: ".5rem" }}
              onClick={(e) => resetForm()}
            >
              Reset Form
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
  );
};

export default CreateTaskForm;
