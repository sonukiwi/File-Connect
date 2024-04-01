import { Amplify } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import MainApp from "./components/App/MainApp/MainApp";
import CircularProgressBarWithOverlay from "./components/UI/CircularProgressBarWithOverlay/CircularProgressBarWithOverlay";
import config from "./amplifyconfiguration.json";
import appConfig from "./config.json";
import { useState } from "react";
import CustomModal from "./components/UI/CustomModal/CustomModal";
Amplify.configure(config);

function App({ signOut, user }) {
  // Handlers :: START
  function close_modal() {
    setModal({ isVisible: false });
  }
  function add_alert(severity, message) {
    const uniqueIdOfAlert = uuidv4();
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      {
        id: uniqueIdOfAlert,
        severity,
        message,
      },
    ]);
    setTimeout(() => {
      setAlerts((prevAlerts) =>
        prevAlerts.filter((alert) => alert.id !== uniqueIdOfAlert)
      );
    }, appConfig.ALERT_DURATION_IN_SECONDS * 1000);
  }
  function remove_alert(alertId) {
    setAlerts((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== alertId)
    );
  }
  function start_upload(files) {
    setIsPageLoading(true);
    setToast((prevToast) => ({
      ...prevToast,
      isVisible: true,
      message: appConfig.FILES_UPLOADING_TOAST_CONFIG.message,
    }));
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
          const alertMessage = `File${
            files.length > 1 ? "s" : ""
          } uploaded successfully`;
          add_alert("success", alertMessage);
        } else {
          const errorCode = responseData.errorCode;
          const isStorageNotAvailable =
            errorCode === appConfig.RETURN_CODES.STORAGE_NOT_AVAILABLE;
          if (isStorageNotAvailable) {
            setModal({
              isVisible: true,
              heading: appConfig.INSUFFICIENT_STORAGE_CONFIG.heading,
              description: appConfig.INSUFFICIENT_STORAGE_CONFIG.description,
              buttonText: appConfig.INSUFFICIENT_STORAGE_CONFIG.buttonText,
            });
          } else {
            throw "Some Error Occured";
          }
        }
      })
      .catch((error) => {
        setModal({
          isVisible: true,
          heading: appConfig.UPLOAD_UNKNOWN_ERROR.heading,
          description: appConfig.UPLOAD_UNKNOWN_ERROR.description,
          buttonText: appConfig.UPLOAD_UNKNOWN_ERROR.buttonText,
        });
      })
      .finally(() => {
        setIsPageLoading(false);
        setToast((prevToast) => ({
          ...prevToast,
          isVisible: false,
        }));
      });
  }
  function upload_files(event) {
    const areFilesPresent = event.target?.files?.length > 0;
    if (areFilesPresent) {
      start_upload(event.target.files);
    }
  }
  // Handlers :: END

  // States :: START
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    vertical: appConfig.FILES_UPLOADING_TOAST_CONFIG.vertical,
    horizontal: appConfig.FILES_UPLOADING_TOAST_CONFIG.horizontal,
  });
  const [modal, setModal] = useState({ isVisible: false });
  const [alerts, setAlerts] = useState([]);
  const areAlertsPresent = alerts.length > 0;
  // States :: END

  // Components :: START
  const toastComponent = (
    <Snackbar
      open={toast.isVisible}
      anchorOrigin={{ vertical: toast.vertical, horizontal: toast.horizontal }}
      message={toast.message}
      key={toast.vertical + toast.horizontal}
    />
  );
  const modalComponent = (
    <CustomModal
      open={modal.isVisible}
      heading={modal.heading}
      description={modal.description}
      onClose={close_modal}
      buttonText={modal.buttonText}
    />
  );
  const alertsComponent =
    areAlertsPresent &&
    alerts.map((alert) => (
      <Alert
        severity={alert.severity}
        key={alert.id}
        onClose={() => remove_alert(alert.id)}
      >
        {alert.message}
      </Alert>
    ));
  const progressBarComponent = (
    <CircularProgressBarWithOverlay open={isPageLoading} />
  );
  const mainAppComponent = (
    <MainApp onLogout={signOut} uploadFiles={upload_files} />
  );
  const footerComponent = (
    <footer>
      <p>
        Developed with ❤️ by <b>Mohammad Sonu</b> (sonukiwi17@gmail.com)
      </p>
    </footer>
  );
  // Components :: END

  return (
    <div className="app">
      {modalComponent}
      {toastComponent}
      {alertsComponent}
      {progressBarComponent}
      {mainAppComponent}
      {footerComponent}
    </div>
  );
}

export default withAuthenticator(App);
