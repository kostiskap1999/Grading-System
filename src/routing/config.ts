import { ReactNode } from "react";

export type RouteType = {
    index?: boolean,
    element: ReactNode,
    protected: boolean,
    path: string,
    sidebarProps?: {
        displayText: string,
        icon?: ReactNode;
    };
};