import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { CustomInput } from "../../components/ui/Custom-Input";
import { CustomButton } from "../../components/ui/Custom-Button";
import styles from "./MyInfoView.module.css";

import { getToken } from "../../redux/auth/authSelectors";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const formStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  padding: "62px 70px",
  boxShadow: "0px 6px 26px rgba(0, 5, 97, 0.1)",
  background: "#fafafa",
  borderRadius: "5px",
  width: "500px",
};
const h1Style = {
  textAlign: "center",
  marginLeft: "0px",
  marginBottom: "10px",
};

const initialUserState = {
  name: "",
  mobile: "",
  email: "",
  address: {
    line1: "",
    line2: "",
    line3: "",
    city: "",
    county: "",
  },
  notifications: [],
};

export default function MyInfoView() {
  const classes = useStyles();

  const [dataResponse, setDataResponse] = useState(initialUserState);
  const token = useSelector(getToken);

  useEffect(() => {
    axios
      .get(`/user/3435/my-info`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDataResponse(response.data);
      })
      .catch((error) => {
        setDataResponse(initialUserState);
      });
  }, []);

  const { name, mobile, email, address, notifications } = dataResponse;
  return (
    <div className={styles.wrapper}>
      <form
        style={formStyle}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <h1 className={styles.title} style={h1Style}>
          Sign Up
        </h1>
        <div className={styles.wrapInputs}>
          <div className={styles.inputWrapper}>
            <p className={styles.title}>Required:</p>
            <CustomInput name={"name"} value={name} />
            <CustomInput name={"password"} value={"*******"} />
            <CustomInput name={"confirmPassword"} value={"*******"} />
            <CustomInput name={"mobile"} value={mobile} />
            <CustomInput name={"email"} value={email} />
          </div>
          <div className={styles.inputWrapper}>
            <p className={styles.title}>Optional:</p>
            {Object.keys(address).map((key) => (
              <CustomInput key={key} name={key} value={address[key]} />
            ))}
          </div>
        </div>

        <div className={styles.wrap}>
          <CustomButton type="submit" title="submit" />

          <p className={styles.descr}>Get Notifications by:</p>
          <div className={styles.group}>
            {notifications.map((notification) => (
              <>
                <input id="check" checked type="checkbox" />
                <label for="check">{notification}</label>
              </>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
