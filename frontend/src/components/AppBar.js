import Navigation from "./Navigation/Navigation";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../redux/auth/authSelectors";
import UserMenu from "./UserMenu/UserMenu";
import AuthNav from "./AuthNav/AuthNav";
import AppBarr from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./AppBar.module.css";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function AppBar() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const classes = useStyles();

  return (
    <AppBarr position="static">
      <Toolbar className={styles.header}>
        <Typography variant="h6" className={classes.title}>
          <Navigation />
        </Typography>
        {isAuthenticated ? <UserMenu /> : <AuthNav />}
      </Toolbar>
    </AppBarr>
  );
}
