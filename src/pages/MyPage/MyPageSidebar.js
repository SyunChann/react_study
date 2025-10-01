import { Divider, List, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";


const menu = [
    {label:"주문 목록", to:"/mypage",end:true},
    {label:"배송 조회",to:"/mypage/tracking"},
    {label:"취소/환불 내역",to:"/mypage/refunds"},
    {label:"1:1채팅",to:"/mypage/chat"},
    {label:"개인정보 확인/수정",to:"/mypage/profile"}
];

const base = "block rounded-lg px-4 py-2 text-sm font-medium transition";

export default function MyPageSidebar(){
    return(
        <Paper 
        elevation={1}
        sx={{
            width: 240,
            p: 2,
            borderRadius:2,
            alignSelf:"stretch",
        }}
        >
            <Typography variant="subtitle1" sx={{fontWeight:700,mb:1}}>
                마이페이지
            </Typography>

            <List disablePadding>
                {menu.map(({ label, to, end},idx)=>(
                    <React.Fragment key={to}>
                        <ListItemButton
                        component={NavLink}
                        to={to}
                        end={end}
                        className={({isActive})=>(isActive ? "active":undefined)}
                        sx={{
                            borderRadius:1.5,
                            px:2,
                            py:1,
                            "&.active":{
                                bgcolor:"primary.light",
                                color:"primary.main",
                                fontWeight:600,
                            },
                            "&:hover":{
                                bgcolor:"action.hover",
                            },
                        }}
                        >
                        
                        <ListItemText 
                        primary={label}
                        primaryTypographyProps={{fontSize:14}}/>

                        </ListItemButton>
                        
                       
                    </React.Fragment>
                ))}
            </List>
        </Paper>

    );
   
};



