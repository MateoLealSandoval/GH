import * as React from "react"
import { UsersRound, Briefcase, Lightbulb } from "lucide-react"
import { NavMain } from "./nav-main"
import { NavOtherPages } from "./nav-other-pages"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "~/components/ui/sidebar"

const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

const pages = [
    {
        title: "Candidatos",
        icon: UsersRound,
        isActive: true,
        pages: [
            {
                title: "Ver candidatos",
                url: "candidates",
            },
            {
                title: "Administrar candidatos",
                url: "admin-candidates",
            },
        ],
    },
    {
        title: "Vacantes",
        icon: Briefcase,
        isActive: true,
        pages: [
            {
                title: "Ver vacantes",
                url: "/vacancies",
            },
            {
                title: "Administrar vacantes",
                url: "/admin-vacancies",
            },
        ],
    },
]

const otherPages = [
    {
        name: "Descubre la app",
        url: "/about",
        icon: Lightbulb,
    }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher name="Iconoi" logo="favicon.ico" href="/dashboard" />
            </SidebarHeader>
            <SidebarContent>
                <NavMain sections={pages} />
                <NavOtherPages otherPages={otherPages} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
