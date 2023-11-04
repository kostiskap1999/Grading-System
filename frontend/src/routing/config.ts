import { ReactNode } from "react";

export type RouteType = {
    index?: boolean,
    element: ReactNode,
    protected: number,
    // protect: number, // 0 = no protection, 1 = normal/user, 2 = professor, 3 = admin 
    path: string,
    sidebarProps?: {
        displayText: string,
        icon?: ReactNode;
    };
};