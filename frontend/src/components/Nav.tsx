import { Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import logo from "./../statics/logo.svg";

const useStyles = makeStyles((theme) => ({
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: ".8rem 1.2rem",
  },
  logo: {
    width: "3.2rem",
  },
}));

const Nav = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.navContainer}>
      <img src={logo} alt="logo" className={classes.logo} />
      <Button color="primary" variant="contained">
        Create Task
      </Button>
    </Paper>
  );
};

export default Nav;
