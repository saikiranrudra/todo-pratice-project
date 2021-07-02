import { Typography } from "@material-ui/core";
import "./App.css";
import Nav from "./components/Nav";
import { makeStyles } from "@material-ui/styles";
import Container from "./components/Container";
import TaskTab from "./components/TaskTab";
import { useEffect, useState, useCallback, useRef } from "react";
import Task from "./interfaces/task";
import taskApi from "./Apis/taskApi";
import { Bar } from "react-chartjs-2";
import { taskColors } from "./helpers/colors";

const useStyles = makeStyles({
  title: {
    fontWeight: "bold",
    margin: "1rem 1.8rem 0 1rem",
  },
  dashboard: {
    display: "grid",
    gridTemplateColumns: "400px 400px 1fr",
    gridTemplateRows: "repeat(2, calc((100vh - 151.6px)/2))",
    padding: "1rem 1rem 0 1rem",
    gridGap: ".6rem",
    height: "calc(100vh - (61.6px + 90px))",
  },
});

const App = () => {
  const classes = useStyles();
  const [todaysTask, setTodaysTask] = useState<Task[]>([]);
  const [veryImportantTask, setVeryImportantTask] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<any>(null);
  const [complectedTask, setComplectedTask] = useState<{
    [key: string]: number;
  }>({});
  const lastAllTaskRef = useRef<typeof TaskTab>(null);

  const goToLastTask = () => {
    console.log(lastAllTaskRef);
    if (lastAllTaskRef?.current) {
      //@ts-ignore
      lastAllTaskRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchAllData = useCallback((): void => {
    // todays tasks
    taskApi.get("/api/v1/task/today").then((res) => {
      setTodaysTask(res.data);
    });

    // very important tasks
    taskApi
      .post("/api/v1/task/all", { query: { type: "very-important" } })
      .then((res) => {
        setVeryImportantTask(res.data.data);
      });

    // All tasks
    taskApi.post("/api/v1/task/all").then((res) => {
      setAllTasks(res.data.data);
    });

    // completed tasks
    taskApi.get("/api/v1/task/completed").then((res) => {
      setComplectedTask(res.data);
    });
  }, [setTodaysTask, setVeryImportantTask, setComplectedTask]);

  useEffect(() => {
    taskApi.get("/api/v1/task/today").then((res) => {
      setTodaysTask(res.data);
    });
  }, []);

  useEffect(() => {
    taskApi
      .post("/api/v1/task/all", { query: { type: "very-important" } })
      .then((res) => {
        setVeryImportantTask(res.data.data);
      });
  }, []);

  useEffect(() => {
    taskApi.post("/api/v1/task/all").then((res) => {
      setAllTasks(res.data.data);
    });
  }, []);

  useEffect(() => {
    taskApi.get("/api/v1/task/completed").then((res) => {
      setComplectedTask(res.data);
    });
  }, []);

  const renderTaskList = useCallback(
    (todaysTask: Task[], fetchAllData) =>
      todaysTask.map((task: Task) => (
        <TaskTab task={task} key={task._id} fetchAllData={fetchAllData} />
      )),
    []
  );

  return (
    <>
      <Nav fetchAllData={fetchAllData} />
      <Typography
        variant="h4"
        component="h1"
        className={classes.title}
        onClick={() => {
          goToLastTask();
        }}
      >
        Dashboard
      </Typography>
      <div className={classes.dashboard}>
        <Container title="Todays Tasks">
          {renderTaskList(todaysTask, fetchAllData)}
        </Container>
        <Container title="Very Important Tasks">
          {renderTaskList(veryImportantTask, fetchAllData)}
        </Container>
        <Container
          title="All Tasks"
          style={{ gridRow: "1 / -1", gridColumn: "2 / 3" }}
        >
          {allTasks?.map((item: Task, index: number, taskList: Task[]) => {
            if (index === taskList.length - 1) {
              return (
                <TaskTab
                  key={item._id}
                  task={item}
                  ref={lastAllTaskRef}
                  fetchAllData={fetchAllData}
                />
              );
            } else {
              return (
                <TaskTab
                  key={item._id}
                  task={item}
                  fetchAllData={fetchAllData}
                />
              );
            }
          })}
        </Container>
        <Container
          title="Text Analytics"
          style={{ gridRow: "1 / -1", gridColumn: "3 / 4" }}
        >
          <Bar
            height={400}
            width={600}
            type="bar"
            data={{
              labels: Object.keys(complectedTask),
              datasets: [
                {
                  label: "Completed Task Chart",
                  data: [
                    complectedTask["very-important"],
                    complectedTask["important"],
                    complectedTask["not-important"],
                  ],
                  backgroundColor: Object.values(taskColors),
                },
              ],
            }}
          />
        </Container>
      </div>
    </>
  );
};

export default App;
