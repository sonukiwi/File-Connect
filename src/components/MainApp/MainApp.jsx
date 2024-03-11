import React from "react";
import LogoutIcon from "@mui/icons-material/LogoutSharp";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import FileUpload from "../FileUpload/FileUpload";
import DataTable from "../DataTable/DataTable";

const DeleteFileButtonStyles = {
  height: "100%",
  flexGrow: 1,
};

const FileUploadStyles = {
  height: "100%",
  flexGrow: 3,
};

const DataTableDivStyles = {
  backgroundColor: "rgb(222, 221, 221)",
};

export default function MainApp({ onLogout, uploadFile }) {
  return (
    <div className="main-app">
      <div className="top-bar">
        <Tooltip title="Logout" placement="bottom">
          <Button variant="contained" onClick={onLogout}>
            <LogoutIcon />
          </Button>
        </Tooltip>
      </div>
      <div className="file-delete-btn-and-upload-file-div">
        <Button
          variant="contained"
          style={DeleteFileButtonStyles}
          color="error"
        >
          Delete File(s)
        </Button>
        <FileUpload
          buttonText="Upload File"
          style={FileUploadStyles}
          uploadFile={uploadFile}
        />
      </div>
      <div className="data-table" style={DataTableDivStyles}>
        <DataTable />
      </div>
    </div>
  );
}
