import React from "react";
import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/system";
import MyPageSidebar from "./MyPageSidebar";

export default function MyPage(){
  return(
    <Container maxWidth="lg" sx={{py:3}}>

    <Box sx={{display:"flex",gap:2,minHeight:"70vh"}}>
    <MyPageSidebar />
    <Box component="main" sx={{flex:1,px:2,py:1}}>
      <Outlet />
    </Box>
    </Box>
    </Container>
  );
};
