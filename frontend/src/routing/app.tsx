import { Provider } from "react-redux";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import DashboardItem from "../components/dashboardItem";
import store, { persistor } from "../store/store";
import appRoutes from "./appRoutes";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./publicRoute";

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Outlet />} />
                        {appRoutes.map((route, index) => (
                          route.index ? (
                            <Route index key={index} element={
                                route.protected != 0 ?
                                    <ProtectedRoute protectionLevel={route.protected}><DashboardItem item={route.element}/></ProtectedRoute>
                                :
                                    <PublicRoute>{route.element}</PublicRoute>
                            } />
                          ) : (
                            <Route path={route.path} key={index} element={
                                route.protected != 0 ?
                                    <ProtectedRoute protectionLevel={route.protected}><DashboardItem item={route.element}/></ProtectedRoute>
                                :
                                    <PublicRoute>{route.element}</PublicRoute>
                            }/>
                          )
                        ))}
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}
