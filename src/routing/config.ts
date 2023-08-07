import { ReactNode } from "react";

export type RouteType = {
    index?: boolean,
    element: JSX.Element,
    protected: boolean,
    path: string,
    sidebarProps?: {
        displayText: string,
        icon?: ReactNode;
    };
};