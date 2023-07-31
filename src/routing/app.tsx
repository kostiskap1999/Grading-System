import { BrowserRouter, Routes, Route, Outlet, redirect } from "react-router-dom";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import ProtectedRoute from "./protect";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Outlet />} />
                        <Route index element={<LoginPage />} />
                        <Route path="/home" element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>}
                        />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
