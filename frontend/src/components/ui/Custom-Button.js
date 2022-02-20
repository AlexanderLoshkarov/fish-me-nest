import React from "react";
import Button from "@material-ui/core/Button";

export function CustomButton({
  style,
  type,
  title,
  disable,
  handleClick, 
}) {
  return (
    <div>
      <Button
        className={style}
        variant="contained"
        color="primary"
        type={type}
        disabled={disable}
        onClick={handleClick}
      >
        {title}
      </Button>
    </div>
  );
}
