import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomInput } from "../../components/ui/Custom-Input";
import { CustomButton } from "../../components/ui/Custom-Button";
import styles from "./RegisterView.module.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const h1Style = {
  textAlign: "center",
  marginLeft: "0px",
  marginBottom: "10px",
};

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

export default function RegisterView() {
  const classes = useStyles();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [addressLine_1, setAddressLine_1] = useState("");
  const [addressLine_2, setAddressLine_2] = useState("");
  const [addressLine_3, setAddressLine_3] = useState("");
  const [city_town_village, setCity_Town_Village] = useState("");
  const [country, setCountry] = useState("");

  // for validation
  const [formValid, setFormValid] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
  const [mobileDirty, setMobileDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // "Password must be at least 5 characters"
  const [confirmPasswordError, setConfirmPasswordError] = useState(""); // "confirmPassword does not match"
  const [mobileError, setMobileError] = useState(""); // "Mobile must contain only numbers"
  const [emailError, setEmailError] = useState(""); // this field is required"

  const disableBtn =
    userName === "" ||
    password === "" ||
    confirmPassword === "" ||
    mobile === "" ||
    email === "";

  const handleBlur = (e) => {
    switch (e.target.name) {
      case "password":
        setPasswordDirty(true);
      case "confirmPassword":
        setConfirmPasswordDirty(true);
      case "mobile":
        setMobileDirty(true);
      case "email":
        setEmailDirty(true);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case "userName":
        return setUserName(value);
      case "password":
        setPassword(value);
        if (value.length < 5) {
          setPasswordError("Password must be at least 5 characters");
        } else {
          setPasswordError("");
        }
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        if (value !== password) {
          setConfirmPasswordError("confirmPassword does not match");
        } else {
          setConfirmPasswordError("");
        }
        break;
      case "mobile":
        setMobile(value);
         if (!Number(value)) {
          setMobileError("Mobile must contain only numbers");
        } else {
          setMobileError("");
        }
        break;
      case "email":
        setEmail(value);
        if (!value) {
          setEmailError("Email is required");
        } else {
          setEmailError("");
        }
        break;
      case "addressLine_1":
        return setAddressLine_1(value);
      case "addressLine_2":
        return setAddressLine_2(value);
      case "addressLine_3":
        return setAddressLine_3(value);
      case "city_town_village":
        return setCity_Town_Village(value);
      case "country":
        return setCountry(value);
      default:
        return;
    }
  };

  useEffect(() => {
    if (passwordError || confirmPasswordError || mobileError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [passwordError, confirmPasswordError, mobileError, emailError]);
  console.log(formValid);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    resetForm();
  };

  const resetForm = () => {
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setMobile("");
    setEmail("");
    setAddressLine_1("");
    setAddressLine_2("");
    setAddressLine_3("");
    setCity_Town_Village("");
    setCountry("");
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={handleSubmitForm}
        style={formStyle}
        autoComplete="off"
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
            <CustomInput
              style={styles.input}
              name="userName"
              type="text"
              handleChange={handleChange}
              value={userName}
            />

            <CustomInput
              // required
              name="password"
              type="password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={password}
            />
            {passwordDirty && passwordError && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {passwordError}
              </div>
            )}
            <CustomInput
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={confirmPassword}
            />
            {confirmPasswordDirty && confirmPasswordError && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {confirmPasswordError}
              </div>
            )}
            <CustomInput
              name="mobile"
              type="text"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={mobile}
            />
            {mobileDirty && mobileError && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {mobileError}
              </div>
            )}

            <CustomInput
              name="email"
              type="email"
              handleChange={handleChange}
              handleBlur={handleBlur}
              value={email}
            />
            {emailDirty && emailError && (
              <div
                style={{ color: "red", fontSize: "12px", textAlign: "center" }}
              >
                {emailError}
              </div>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <p className={styles.title}>Optional:</p>
            <CustomInput
              name="addressLine_1"
              type="text"
              handleChange={handleChange}
              value={addressLine_1}
            />
            <CustomInput
              name="addressLine_2"
              type="text"
              handleChange={handleChange}
              value={addressLine_2}
            />
            <CustomInput
              name="addressLine_3"
              type="text"
              handleChange={handleChange}
              value={addressLine_3}
            />
            <CustomInput
              name="city_town_village"
              type="text"
              handleChange={handleChange}
              value={city_town_village}
            />
            <CustomInput
              name="country"
              type="text"
              handleChange={handleChange}
              value={country}
            />
          </div>
        </div>
        <div className={styles.wrap}>
          <CustomButton
            type="submit"
            title="submit"
            disable={disableBtn || !formValid ? true : false}
          />

          <p className={styles.descr}> Get Notifications by: </p>
          <div className={styles.group}>
            <input id="check" type="checkbox" className={styles.check} />
            <label for="check">Email</label>
            <input
              id="check"
              type="checkbox"
              className={styles.check}
              // checked
            />
            <label for="check">SMS</label>
          </div>
        </div>
      </form>
    </div>
  );
}



