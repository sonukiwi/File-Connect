import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Snackbar from "@mui/material/Snackbar";
import MainApp from "./components/App/MainApp/MainApp";
import CircularProgressBarWithOverlay from "./components/UI/CircularProgressBarWithOverlay/CircularProgressBarWithOverlay";
import config from "./amplifyconfiguration.json";
import appConfig from "./config.json";
import {
  get_file_presigned_download_url,
  get_files_fetch_url,
  get_user_info_url,
} from "./utils";
import { useEffect, useReducer } from "react";
import React from "react";
import CustomModal from "./components/UI/CustomModal/CustomModal";
import { reducer } from "./reducer";
Amplify.configure(config);

const initialState = {
  isPageLoading: true,
  isLoadMoreFilesBtnLoading: false,
  isUserInfoLoading: true,
  filesInfo: {},
  checkedIndexes: [],
  userInfo: {},
  dialog: {
    isVisible: false,
  },
  toast: {
    isVisible: false,
    vertical: appConfig.FILES_UPLOADING_TOAST_CONFIG.vertical,
    horizontal: appConfig.FILES_UPLOADING_TOAST_CONFIG.horizontal,
  },
};

function App({ signOut, user }) {
  // State :: START
  const [state, dispatch] = useReducer(reducer, initialState);
  // State :: END

  // Handlers :: START
  function show_toast(message, hideAfterSeconds = 0) {
    dispatch({
      type: "SHOW_TOAST",
      payload: {
        message,
      },
    });
    if (hideAfterSeconds !== 0) {
      setTimeout(() => {
        hide_toast();
      }, hideAfterSeconds * 1000);
    }
  }
  function hide_toast() {
    dispatch({ type: "HIDE_TOAST" });
  }
  function show_dialog(heading, description, buttonText) {
    dispatch({
      type: "SHOW_DIALOG",
      payload: { heading, description, buttonText },
    });
  }
  function close_dialog() {
    dispatch({ type: "HIDE_DIALOG" });
  }
  function load_more_files() {
    dispatch({ type: "START__LOAD_MORE_FILES" });
    const filesCount = filesInfo.Contents.length;
    const lastKeySoFar = filesInfo.Contents[filesCount - 1].Key;
    const apiUrl = get_files_fetch_url(user.username, lastKeySoFar);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((responseData) => {
        const isRequestSuccessful =
          responseData.code === appConfig.RETURN_CODES.SUCCESS;
        if (isRequestSuccessful) {
          dispatch({ type: "SET_FILES_INFO", payload: responseData.data });
          const loadedFilesCount = responseData.data.Contents.length;
          show_toast(
            `${loadedFilesCount} file${
              loadedFilesCount > 1 ? "s" : ""
            } loaded successfully`,
            appConfig.FILES_LOADED_TOAST_CONFIG.hideAfterSeconds
          );
        } else {
          throw "Error";
        }
      })
      .catch((err) => {
        console.error(err);
        const { heading, buttonText, description } =
          appConfig.UNEXPECTED_ERROR_CONFIG;
        show_dialog(heading, description.GET_MORE_FILES, buttonText);
      })
      .finally(() => {
        dispatch({ type: "COMPLETE__LOAD_MORE_FILES" });
      });
  }
  function start_upload(files) {
    dispatch({ type: "START__PAGE_LOADING" });
    show_toast(
      `Uploading ${files.length} file${
        files.length > 1 ? "s" : ""
      }. Please wait ...`
    );
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append(`file${i}`, file);
    }
    formData.append("userName", user.username);
    fetch(appConfig.UPLOAD_FILES_LAMBDA_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => {
        const isUploadSuccessful =
          responseData.code === appConfig.RETURN_CODES.SUCCESS;
        if (isUploadSuccessful) {
          const toastMessage = `File${
            files.length > 1 ? "s" : ""
          } uploaded successfully.`;
          show_toast(
            toastMessage,
            appConfig.UPLOAD_FILES_COMPLETE_TOAST_CONFIG.hideAfterSeconds
          );
          dispatch({ type: "RESET_FILES_INFO" });
          get_first_batch_of_files(user.username);
          get_user_info(user.username);
        } else {
          const errorCode = responseData.errorCode;
          const isStorageNotAvailable =
            errorCode === appConfig.RETURN_CODES.STORAGE_NOT_AVAILABLE;
          if (isStorageNotAvailable) {
            dispatch({ type: "COMPLETE__PAGE_LOADING" });
            const { heading, description, buttonText } =
              appConfig.INSUFFICIENT_STORAGE_CONFIG;
            show_dialog(heading, description, buttonText);
          } else {
            throw "Error";
          }
        }
      })
      .catch((err) => {
        dispatch({ type: "COMPLETE__PAGE_LOADING" });
        console.error(err);
        const { heading, buttonText, description } =
          appConfig.UNEXPECTED_ERROR_CONFIG;
        show_dialog(heading, description.UPLOAD, buttonText);
        hide_toast();
      });
  }
  function upload_files(event) {
    const areFilesPresent = event.target?.files?.length > 0;
    if (areFilesPresent) {
      start_upload(event.target.files);
    }
  }
  function get_first_batch_of_files(userName) {
    const apiUrl = get_files_fetch_url(userName);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((responseData) => {
        const isRequestSuccessful =
          responseData.code === appConfig.RETURN_CODES.SUCCESS;
        if (isRequestSuccessful) {
          dispatch({ type: "SET_FILES_INFO", payload: responseData.data });
        } else {
          throw "Error";
        }
      })
      .catch((err) => {
        console.error(err);
        const { heading, buttonText, description } =
          appConfig.UNEXPECTED_ERROR_CONFIG;
        show_dialog(heading, description.GET_FILES, buttonText);
      })
      .finally(() => {
        dispatch({ type: "COMPLETE__PAGE_LOADING" });
      });
  }
  function get_user_info(userName) {
    const apiUrl = get_user_info_url(userName);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((responseData) => {
        const isRequestSuccessful =
          responseData.code === appConfig.RETURN_CODES.SUCCESS;
        if (isRequestSuccessful) {
          dispatch({ type: "SET_USER_INFO", payload: responseData.data.Item });
        } else {
          throw "Error";
        }
      })
      .catch((err) => {
        console.error(err);
        const { heading, buttonText, description } =
          appConfig.UNEXPECTED_ERROR_CONFIG;
        show_dialog(heading, description.GET_USER_INFO, buttonText);
      })
      .finally(() => {
        dispatch({ type: "COMPLETE__USER_INFO_LOADING" });
      });
  }
  function handle_checkbox_change(event, fileIndex) {
    const isChecked = event.target.checked;
    if (isChecked) {
      dispatch({ type: "ADD_CHECKED_INDEX", payload: { index: fileIndex } });
    } else {
      dispatch({ type: "REMOVE_CHECKED_INDEX", payload: { index: fileIndex } });
    }
  }
  function delete_files() {
    const filesToDelete = checkedIndexes.map((index) => {
      return filesInfo.Contents[index].fileName;
    });
    dispatch({ type: "START__PAGE_LOADING" });
    show_toast(
      `Deleting ${filesToDelete.length} file${
        filesToDelete.length > 1 ? "s" : ""
      }. Please wait ...`
    );
    const postData = {
      userName: user.username,
      files: filesToDelete,
    };
    fetch(appConfig.DELETE_FILES_LAMBDA_URL, {
      method: "POST",
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((responseData) => {
        const isDeleteSuccessful =
          responseData.code === appConfig.RETURN_CODES.SUCCESS;
        if (isDeleteSuccessful) {
          dispatch({
            type: "REMOVE_FILES_FROM_FILES_INFO",
            payload: {
              files: filesToDelete,
            },
          });
          dispatch({ type: "RESET_CHECKED_INDEXES" });
          const toastMessage = `File${
            filesToDelete.length > 1 ? "s" : ""
          } deleted successfully.`;
          show_toast(
            toastMessage,
            appConfig.DELETE_FILES_COMPLETE_TOAST_CONFIG.hideAfterSeconds
          );
          get_user_info(user.username);
        } else {
          throw "Error";
        }
      })
      .catch((err) => {
        console.error(err);
        const { heading, buttonText, description } =
          appConfig.UNEXPECTED_ERROR_CONFIG;
        show_dialog(heading, description.DELETE, buttonText);
        hide_toast();
      })
      .finally(() => {
        dispatch({ type: "COMPLETE__PAGE_LOADING" });
      });
  }
  function download_file() {
    const fileToDownload = filesInfo.Contents[checkedIndexes[0]].fileName;
    show_toast(`Downloading file. Please wait ...`);
    const apiUrl = get_file_presigned_download_url(
      user.username,
      fileToDownload
    );
    fetch(apiUrl)
      .then((response) => response.json())
      .then(async (responseData) => {
        const isRequestSuccessful =
          responseData.code === appConfig.RETURN_CODES.SUCCESS;
        if (isRequestSuccessful) {
          const { url: presignedUrl } = responseData.data;
          const link = document.createElement("a");
          link.href = presignedUrl;
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
          const toastMessage = `Download started successfully.`;
          show_toast(
            toastMessage,
            appConfig.DOWNLOAD_FILE_COMPLETE_TOAST_CONFIG.hideAfterSeconds
          );
        } else {
          throw "Error";
        }
      })
      .catch((err) => {
        console.error(err);
        const { heading, buttonText, description } =
          appConfig.UNEXPECTED_ERROR_CONFIG;
        show_dialog(heading, description.DOWNLOAD, buttonText);
        hide_toast();
      });
  }
  // Handlers :: END

  // useEffect :: START
  useEffect(() => {
    get_first_batch_of_files(user.username);
    get_user_info(user.username);
  }, []);
  // useEffect :: END

  const {
    toast,
    dialog,
    isPageLoading,
    filesInfo,
    isLoadMoreFilesBtnLoading,
    checkedIndexes,
    userInfo,
    isUserInfoLoading,
  } = state;
  const dialogComponent = (
    <CustomModal
      open={dialog.isVisible}
      heading={dialog.heading}
      description={dialog.description}
      buttonText={dialog.buttonText}
      onClose={close_dialog}
    />
  );
  const toastComponent = (
    <Snackbar
      open={toast.isVisible}
      anchorOrigin={{ vertical: toast.vertical, horizontal: toast.horizontal }}
      message={toast.message}
      key={toast.vertical + toast.horizontal}
    />
  );
  const progressBarComponent = (
    <CircularProgressBarWithOverlay open={isPageLoading} />
  );
  const isDeleteBtnActive = checkedIndexes.length > 0;
  const isDownloadBtnActive = checkedIndexes.length === 1;
  const mainAppComponent = (
    <MainApp
      onLogout={signOut}
      uploadFiles={upload_files}
      filesInfo={filesInfo}
      isLoadMoreFilesBtnLoading={isLoadMoreFilesBtnLoading}
      isDeleteBtnActive={isDeleteBtnActive}
      isDownloadBtnActive={isDownloadBtnActive}
      loadMoreFiles={load_more_files}
      onChangeCheckbox={handle_checkbox_change}
      onDeleteFiles={delete_files}
      onDownloadFile={download_file}
      isUserInfoLoading={isUserInfoLoading}
      fetchedFilesCount={filesInfo.Contents?.length}
      totalFilesCount={userInfo.FilesCount}
    />
  );
  const footerComponent = (
    <footer>
      <p>
        Developed with ❤️ by <b>Mohammad Sonu</b> (sonukiwi17@gmail.com)
      </p>
    </footer>
  );

  return (
    <div className="app">
      {dialogComponent}
      {toastComponent}
      {progressBarComponent}
      {mainAppComponent}
      {footerComponent}
    </div>
  );
}

export default withAuthenticator(App);
