import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";

export default function PublicLayout() {
    const [tokenValido, setTokenValido] = useState<boolean | null>(null);

    useEffect(() => {
        const valid = localStorage.getItem("tokenValido") === "true";
        setTokenValido(valid);
    }, []);

    if (tokenValido === null) {
        return null;
    }

    if (tokenValido) {
        return <Navigate to="/dashboard" replace />; 
    }

    return <Outlet />;
}
