import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet, redirect } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import React from "react";
import reportWebVitals from "./reportWebVitals";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<LoginPage />} />
          <Route path="home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


