import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <ul className={styles.navList}>
      <li className={styles.navListItem}>
        <NavLink
          exact
          to="/login"
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
        >
          Login
        </NavLink>
      </li>
      <li className={styles.navListItem}>
        <NavLink
          exact
          to="/register"
          className={styles.navLink}
          activeClassName={styles.navLinkActive}
        >
          Sign up
        </NavLink>
      </li>
    </ul>
  );
};

export default AuthNav;
