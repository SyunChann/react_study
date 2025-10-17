import { Outlet } from "react-router-dom";
import AppAppBar from "../components/AppAppBar";
import Footer from '../components/Footer';
import { Container } from "@mui/material";

export default function NavLayout() {
    return (
        <>
        <AppAppBar />
        <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', py: 12, gap: 4 }}
        >
            <Outlet />
        </Container>
        <Footer />
        </>
    );
}