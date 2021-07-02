import { Paper, Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
import logo from "./../statics/logo.svg";
import CreateTaskForm from "./CreateTaskForm";

const useStyles = makeStyles({
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: ".8rem 1.2rem",
  },
  logo: {
    width: "3.2rem",
  },
  modelContainer: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  modelPaper: {
    display: "inline-block",
    width: "500px",
  },
});

const Nav = ({ fetchAllData }: { fetchAllData: () => void }) => {
  const classes = useStyles();
  const [openForm, setOpenForm] = useState(false);

  const handleClose = () => {
    setOpenForm(false);
  };

  return (
    <Paper className={classes.navContainer}>
      <img src={logo} alt="logo" className={classes.logo} />
      <Button
        color="primary"
        variant="contained"
        onClick={() => setOpenForm(true)}
      >
        Create Task
      </Button>
      <Modal open={openForm} onClose={handleClose}>
        <div className={classes.modelContainer}>
          <Paper className={classes.modelPaper}>
            <CreateTaskForm fetchAllData={fetchAllData} />
          </Paper>
        </div>
      </Modal>
    </Paper>
  );
};

export default Nav;
