import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "cmw-uikit/lib/style.css";
import registerServiceWorker from "./registerServiceWorker";

const root = document.getElementById("root");

ReactDOM.render(<App />, root);
registerServiceWorker();
