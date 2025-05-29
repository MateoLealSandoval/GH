
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";
import { AppSidebar } from "./components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

export default function ProtectedLayout() {
    const [tokenValido, setTokenValido] = useState<boolean | null>(null);

    useEffect(() => {
        const valid = localStorage.getItem("tokenValido") === "true";
        setTokenValido(valid);
    }, []);

    if (tokenValido === null) {
        return null;
    }

    if (!tokenValido) {
        return <Navigate to="/" replace />;
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="flex flex-col h-screen overflow-y-auto">
                <header
                    className="sticky top-0 z-20 flex bg-background h-16 shrink-0 items-center gap-2 px-4  border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
                >
                    <SidebarTrigger className="-ml-1 mr-2" />
                    {/* <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb> */}
                </header>
                <div className="flex-1 p-4 w-full overflow-auto">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
