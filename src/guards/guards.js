import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { showNotification } from "../features/ui/notificationSlice";

export function RequireAuth({ children }) {
    const isLoggedIn = useSelector(s => s.auth.isLoggedIn);
    const location = useLocation();
    const dispatch = useDispatch();

    if (!isLoggedIn) {
        dispatch(showNotification({ message: "로그인 후 이용 가능합니다.", severity: "warning" }));
        return <Navigate to="/signin" replace state={{ from: location }} />;
    }
    return children;
    }

    export function RequireAdmin({ children }) {
    const user = useSelector(s => s.auth.user);
    const isAdmin = user?.role === "ADMIN";
    const dispatch = useDispatch();

    if (!isAdmin) {
        dispatch(showNotification({ message: "이용 권한이 없습니다.", severity: "error" }));
        return <Navigate to="/" replace />;
    }
    return children;
}

export function GuestOnly({ children, redirectTo = "/" }) {
    const isLoggedIn = useSelector(s => s.auth.isLoggedIn);
    const dispatch = useDispatch();

    if (isLoggedIn) {
        dispatch(showNotification({ message: "이미 로그인된 상태입니다.", severity: "info" }));
        return <Navigate to={redirectTo} replace />;
    }
    return children;
}