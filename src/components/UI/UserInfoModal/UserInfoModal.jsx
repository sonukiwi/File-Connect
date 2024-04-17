import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { get_formatted_date, get_formatted_size } from "../../../utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserInfoModal({ open, handleClose, userInfo }) {
  const { Username, CreatedAt, Email, FilesCount, StorageAvailableInBytes } =
    userInfo;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          User Information
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 4 }}>
          <hr />
          <b>User ID</b> : {Username}
          <hr />
          <b>Email</b> : {Email}
          <hr />
          <b>Registered At</b> : {get_formatted_date(CreatedAt)}
          <hr />
          <b>Files Uploaded</b> : {FilesCount}
          <hr />
          <b>Storage Available</b> :{" "}
          {get_formatted_size(StorageAvailableInBytes)}
          <hr />
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            className="sharp__corner__btn"
          >
            Close
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
