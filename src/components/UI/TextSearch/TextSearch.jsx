import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

export default function TextSearch({ style, placeholder }) {
  const [currentText, setCurrentText] = useState("");
  const showCross = currentText.length > 0;
  const handleTextChange = (e) => {
    const currentText = e.target.value || "";
    setCurrentText(currentText);
  };
  const clearText = () => {
    setCurrentText("");
  };

  return (
    <FormControl variant="outlined" style={style}>
      <OutlinedInput
        id="outlined-adornment-textSearch"
        type="text"
        placeholder={placeholder}
        onChange={handleTextChange}
        value={currentText}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="enable text search delete"
              edge="end"
              onClick={clearText}
            >
              {showCross ? <ClearIcon /> : null}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
