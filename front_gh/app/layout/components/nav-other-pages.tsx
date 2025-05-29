import { Link } from "react-router"
import { type LucideIcon } from "lucide-react"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "~/components/ui/sidebar"

export function NavOtherPages({
    otherPages,
}: {
    otherPages: {
        name: string
        url: string
        icon: LucideIcon
    }[]
}) {

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Otros</SidebarGroupLabel>
            <SidebarMenu>
                {otherPages.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            <Link to={item.url}>
                                <item.icon />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
