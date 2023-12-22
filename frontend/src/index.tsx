import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./routing/app";

import './styles/general.scss';
import './styles/button.scss';
import './styles/text.scss';

import './styles/login.scss';
import './styles/newProject.scss';

import './styles/gradeBox.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
