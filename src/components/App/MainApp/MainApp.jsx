import React from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { CircularProgress } from "@mui/material";
import FileUpload from "../../UI/FileUpload/FileUpload";
import DataTable from "../../UI/DataTable/DataTable";
import { get_pagination_message } from "../../../utils";

const ButtonStyles = {
  height: "100%",
};

const FileUploadStyles = {
  height: "100%",
  flexGrow: 1,
  padding: "0rem 2rem",
};

const FilesListInfoStyles = {
  flexGrow: 2,
  textAlign: "right",
  fontWeight: "bold",
  // backgroundColor: "white",
};

const DataTableDivStyles = {
  backgroundColor: "rgb(222, 221, 221)",
  borderRadius: "0",
};

export default function MainApp({
  onLogout,
  uploadFiles,
  filesInfo,
  loadMoreFiles,
  isLoadMoreFilesBtnLoading,
  isDeleteBtnActive,
  isDownloadBtnActive,
  onChangeCheckbox,
  onDeleteFiles,
  onDownloadFile,
  isUserInfoLoading,
  fetchedFilesCount,
  totalFilesCount,
  showUserInfo,
}) {
  const paginationMessage = get_pagination_message(
    fetchedFilesCount,
    totalFilesCount
  );
  const loadMoreBtnDiv = (
    <div className="load__more__btn__div">
      <Button
        variant="contained"
        onClick={loadMoreFiles}
        className="load__more__btn"
        style={{ height: "4rem" }}
      >
        {isLoadMoreFilesBtnLoading ? (
          <CircularProgress
            sx={{
              color: "white",
            }}
            size={30}
          />
        ) : (
          "Load More"
        )}
      </Button>
    </div>
  );
  return (
    <div className="main-app">
      <div className="top-bar">
        <Tooltip title="Check User Info" placement="bottom">
          <Button
            variant="contained"
            className="sharp__corner__btn"
            onClick={showUserInfo}
          >
            <AccountCircleIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Logout" placement="bottom">
          <Button
            variant="contained"
            color="error"
            className="sharp__corner__btn"
            onClick={onLogout}
          >
            <PowerSettingsNewIcon />
          </Button>
        </Tooltip>
      </div>
      <div className="actions-div">
        <Tooltip title="Delete Selected Files" placement="top">
          <Button
            variant="contained"
            style={ButtonStyles}
            color="error"
            disabled={!isDeleteBtnActive}
            onClick={onDeleteFiles}
            className="sharp__corner__btn"
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Download Selected File" placement="top">
          <Button
            variant="contained"
            style={ButtonStyles}
            color="success"
            disabled={!isDownloadBtnActive}
            onClick={onDownloadFile}
            className="sharp__corner__btn"
          >
            <DownloadIcon />
          </Button>
        </Tooltip>
        <FileUpload
          buttonText="Upload File"
          style={FileUploadStyles}
          uploadFiles={uploadFiles}
        />
        <div style={FilesListInfoStyles}>
          {isUserInfoLoading ? (
            <CircularProgress
              size={30}
              color="secondary"
              sx={{ paddingRight: "2rem" }}
            />
          ) : (
            <p
              style={{
                fontSize: "18px",
              }}
            >
              {paginationMessage}
            </p>
          )}
        </div>
      </div>
      <div className="data-table">
        <DataTable
          style={DataTableDivStyles}
          files={filesInfo.Contents}
          onChangeCheckbox={onChangeCheckbox}
        />
      </div>
      {filesInfo.IsTruncated && loadMoreBtnDiv}
    </div>
  );
}
