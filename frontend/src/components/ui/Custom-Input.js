import React from "react";
import TextField from "@material-ui/core/TextField";

export function CustomInput({
  type,
  name,
  value,
  style,
  placeholder,
  handleChange,
  handleBlur,
}) {
  return (
    <div>
      <TextField
        label={name}
        type={type}
        variant="outlined"
        name={name}
        value={value}
        className={style}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}
