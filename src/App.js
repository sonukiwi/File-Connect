import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Alert from "@mui/material/Alert";
import MainApp from "./components/App/MainApp/MainApp";
import CircularProgressBarWithOverlay from "./components/UI/CircularProgressBarWithOverlay/CircularProgressBarWithOverlay";
import config from "./amplifyconfiguration.json";
import appConfig from "./config.json";
import { useState } from "react";
import { upload } from "@testing-library/user-event/dist/upload";
Amplify.configure(config);

const UPLOAD_FILE_API_URL = appConfig.UPLOAD_FILES_LAMBDA_URL;

function App({ signOut, user }) {
  function uploadFile(event) {
    const isFilePresent = event.target?.files?.length > 0;
    if (isFilePresent) {
      setIsPageLoading(true);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username", user.username);
      fetch(UPLOAD_FILE_API_URL, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          const uploadCode = data.code;
          if (uploadCode === appConfig.UPLOAD_CODES.SUCCESS) {
            setShowFileUploaddedAlert(true);
            setTimeout(() => {
              setShowFileUploaddedAlert(false);
            }, 3000);
          } else if (uploadCode === appConfig.UPLOAD_CODES.FAILURE) {
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsPageLoading(false);
        });
    }
  }
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showFileUploadedAlert, setShowFileUploaddedAlert] = useState(false);
  const progressBarComponent = (
    <CircularProgressBarWithOverlay open={isPageLoading} />
  );
  const mainAppComponent = (
    <MainApp onLogout={signOut} uploadFile={uploadFile} />
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
      {showFileUploadedAlert && (
        <Alert severity="success">File Uploaded Successfully!</Alert>
      )}
      ;{progressBarComponent}
      {mainAppComponent}
      {footerComponent}
    </div>
  );
}

export default withAuthenticator(App);
