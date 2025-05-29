import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("layout/public-layout.tsx", [
        index("routes/auth/login.tsx"),
    ]),
    layout("layout/layout.tsx", [
        route("dashboard", "routes/dashboard.tsx"),
        route("candidates", "routes/candidates/candidates.tsx"),
        route("admin-candidates", "routes/candidates/admin-candidates.tsx"),
        route("vacancies", "routes/vacancies/vacancies.tsx"),
        route("admin-vacancies", "routes/vacancies/admin-vacancies.tsx"),
        route("about", "routes/about/about.tsx"),
    ]),
    route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
