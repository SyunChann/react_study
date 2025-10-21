import { Outlet } from "react-router-dom";
import { RequireAuth, RequireAdmin, GuestOnly } from "./guards";

// 로그인만 필요한 구역
export function AuthGuardLayout() {
    return (
        <RequireAuth>
            <Outlet />
        </RequireAuth>
    );
}

export function GuestOnlyGuardLayout() {
    return (
        <GuestOnly>
            <Outlet />
        </GuestOnly>
    )
}



    // 관리자 전용 구역
export function AdminGuardLayout() {
    return (
        <RequireAuth>
            <RequireAdmin>
                <Outlet />
            </RequireAdmin>
        </RequireAuth>
    );

}