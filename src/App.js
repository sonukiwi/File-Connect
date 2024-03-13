import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import LinearProgressBar from "./components/UI/LinearProgressBar/LinearProgressBar";
import MainApp from "./components/App/MainApp/MainApp";
import config from "./amplifyconfiguration.json";
import { useState } from "react";
Amplify.configure(config);

const linearProgressBarConfig = {
  styles: {
    width: "40%",
    marginTop: "1px",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
};

function App({ signOut, user }) {
  function uploadFile(event) {
    alert("Uploading file ...");
  }
  const [isPageLoading, setIsPageLoading] = useState(false);
  const linearProgressBarComponent = isPageLoading ? (
    <LinearProgressBar style={linearProgressBarConfig.styles} />
  ) : null;
  const mainAppComponent = isPageLoading ? null : (
    <MainApp onLogout={signOut} uploadFile={uploadFile} />
  );
  return (
    <div className="app">
      {linearProgressBarComponent}
      {mainAppComponent}
      <footer>
        <p>
          Developed with ❤️ by <b>Mohammad Sonu</b> (sonukiwi17@gmail.com)
        </p>
      </footer>
    </div>
  );
}

export default withAuthenticator(App);
