import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/authOperations";
import { getToken } from "../../redux/auth/authSelectors";
import jwt_decode from "jwt-decode";
import styles from "./UserMenu.module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const decodedToken = jwt_decode(token);
  const name = decodedToken.username;

  return (
    <div className={styles.div}>
      <span className={styles.span}>Welcome, {name}</span>
      <button
        className={styles.button}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Logout
      </button>
    </div>
  );
}
