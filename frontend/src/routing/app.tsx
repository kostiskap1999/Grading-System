import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "../store/store";
import ProtectedRoute from "./protectedRoute";
import { PersistGate } from "redux-persist/integration/react";
import PublicRoute from "./publicRoute";
import appRoutes from "./appRoutes";
import DashboardItem from "../components/dashboardItem";

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
                        
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}