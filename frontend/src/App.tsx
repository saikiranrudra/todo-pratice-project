import { Typography } from "@material-ui/core";
import "./App.css";
import Nav from "./components/Nav";
import { makeStyles } from "@material-ui/styles";
import TaskContainer from "./components/TaskContainer";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    margin: "1rem 1.8rem",
  },
  dashboard: {
    display: "grid",
    gridTemplateColumns: "370px 370px 1fr",
    gridTemplateRows: "repeat(2, 1fr)",
    padding: "1rem 1rem 0 1rem",
    gridGap: ".6rem",
    height: "calc(100vh - (61.6px + 100px))"
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <>
      <Nav />
      <Typography variant="h4" component="h1" className={classes.title}>
        Dashboard
      </Typography>
      <div className={classes.dashboard}>
        <TaskContainer title="Todays Tasks" tasks={[]} />
        <TaskContainer title="Important Tasks" tasks={[]} />
        <TaskContainer
          title="All Tasks"
          tasks={[]}
          style={{ gridRow: "1 / -1", gridColumn: "2 / 3" }}
        />
        <TaskContainer
          title="Text Analytics"
          tasks={[]}
          style={{ gridRow: "1 / -1", gridColumn: "3 / 4" }}
        />
      </div>
    </>
  );
};

export default App;
