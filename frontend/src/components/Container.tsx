import { CSSProperties, ReactNode } from "react";
import { Typography } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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
    overflowY: "scroll"
  },
});

interface propType {
  title: string;
  children?: ReactNode | ReactNode[];
  style?: CSSProperties;
}

const Container = ({title, children = "", style = {}}: propType) => {
  const classes = useStyles();
  return (
    <Paper className={classes.container} style={style} >
      <Typography variant="h6" className={classes.containerTitle}>
        {title}
      </Typography>
      <div>
        {children}
      </div>
    </Paper>
  );
};

export default Container;
