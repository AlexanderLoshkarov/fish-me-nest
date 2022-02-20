import { Link } from "react-router-dom";
import { CustomInput } from "../../components/ui/Custom-Input";
import { CustomButton } from "../../components/ui/Custom-Button";
import styles from "./LoginView.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/authOperations";

const LoginView = () => {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const user = { userName, password };
    dispatch(logIn(user));

    setUserName("");
    setPassword("");
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmitForm} className={styles.form}>
        <h1 className={styles.title}>Login</h1>
        <CustomInput
          style={styles.input}
          name="userName"
          handleChange={({ target: { value } }) => setUserName(value)}
          type="text"
          value={userName}
        />
        <CustomInput
          style={styles.input}
          name="password"
          type="password"
          handleChange={({ target: { value } }) => setPassword(value)}
          value={password}
        />
        <CustomButton type="submit" title="submit" />

        <div className={styles.wrap}>
          <p className={styles.descr}> Forgot Password? </p>
          <Link to="/register" className={styles.descr}>
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
