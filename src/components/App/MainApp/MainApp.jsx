import React from "react";
import LogoutIcon from "@mui/icons-material/LogoutSharp";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import FileUpload from "../../UI/FileUpload/FileUpload";
import DataTable from "../../UI/DataTable/DataTable";
import TextSearch from "../../UI/TextSearch/TextSearch";

const ButtonStyles = {
  height: "100%",
};

const FileUploadStyles = {
  height: "100%",
  flexGrow: 1,
  padding: "0rem 2rem",
};

const TextSearchStyles = {
  height: "100%",
  flexGrow: 2,
  marginLeft: "4rem",
  backgroundColor: "rgb(222, 221, 221)",
};

const DataTableDivStyles = {
  backgroundColor: "rgb(222, 221, 221)",
  borderRadius: "0",
};

export default function MainApp({ onLogout, uploadFiles }) {
  return (
    <div className="main-app">
      <div className="top-bar">
        <Tooltip title="Logout" placement="bottom">
          <Button variant="contained" onClick={onLogout}>
            <LogoutIcon />
          </Button>
        </Tooltip>
      </div>
      <div className="actions-div">
        <Tooltip title="Delete Selected Files" placement="top">
          <Button variant="contained" style={ButtonStyles} color="error">
            <DeleteIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Download Selected File" placement="top">
          <Button variant="contained" style={ButtonStyles} color="success">
            <DownloadIcon />
          </Button>
        </Tooltip>
        <FileUpload
          buttonText="Upload File"
          style={FileUploadStyles}
          uploadFiles={uploadFiles}
        />
        <TextSearch
          style={TextSearchStyles}
          placeholder="Search Files. Enter text and press enter to search."
        />
      </div>
      <div className="data-table">
        <DataTable style={DataTableDivStyles} />
      </div>
    </div>
  );
}
