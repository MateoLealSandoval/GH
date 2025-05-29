import { Link } from "react-router";

export function TeamSwitcher({
    name,
    logo,
    href = "#",
}: {
    name: string;
    logo: string;
    href?: string;
}) {
    return (
        <Link
            to={href}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
        >
            <img
                src={logo}
                alt={`${name} logo`}
                className="size-4 rounded"
            />
            <span className="text-sm font-semibold truncate">{name}</span>
        </Link>
    );
}
