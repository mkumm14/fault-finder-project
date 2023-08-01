import { DashboardConfig } from "@/types"

export const dashboardConfig: DashboardConfig = {
    // mainNav: [
    //     {
    //         title: "Documentation",
    //         href: "/docs",
    //     },
    //     {
    //         title: "Support",
    //         href: "/support",
    //         disabled: true,
    //     },
    // ],
    sidebarNav: [
        {
            title: "dashboard",
            href: "/dashboard",
            icon: "post",
        },
        {
            title: "chat",
            href: "/chat",
            icon: "billing",
        },
        {
            title: "Projects",
            href: "/projects",
            icon: "settings",
        },
    ],
}