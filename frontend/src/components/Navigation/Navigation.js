import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../../redux/auth/authSelectors";

const Navigation = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <nav>
      <NavLink
        exact
        className={styles.link}
        activeClassName={styles.activeLink}
        to="/"
      >
        Home
      </NavLink>

      {isAuthenticated && (
        <NavLink
          exact
          className={styles.link}
          activeClassName={styles.activeLink}
          to="/myinfo"
        >
          MyInfo
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
