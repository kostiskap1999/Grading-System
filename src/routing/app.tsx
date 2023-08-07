import { BrowserRouter, Routes, Route, Outlet, redirect } from "react-router-dom";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import ProtectedRoute from "./protectedRoute";
import { PersistGate } from "redux-persist/integration/react";
import PublicRoute from "./publicRoute";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Outlet />} />
                        <Route index element={
                            <PublicRoute>
                                <LoginPage />
                            </PublicRoute>
                        } />
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
