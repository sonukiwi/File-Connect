import * as React from "react";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularProgressBarWithOverlay({ open }) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
          outline: "none",
        }}
      >
        <CircularProgress variant="indeterminate" color="primary" />
      </Sheet>
    </Modal>
  );
}
