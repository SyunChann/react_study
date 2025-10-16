import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function NoticeList() {
    const [notice,setNotice] = useState([]);

    useEffect(()=>{
        const fetchNotice = async () => {
            try{
                const res = await axios.get(`${baseURL}/api/notice`);
                const sorted = (res.data?.data || []).sort(
                    (a,b)=> b.notice_id - a.notice_id
                );
                setNotice(sorted);
            }catch(err){
                console.error('공지 목록 불러오기 실패',err);
            }
        };
        fetchNotice();
    },[]);
   

     return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">공지 목록</Typography>
        <Button component={Link} to="/notice/create" variant="contained">
          공지 작성
        </Button>
      </Stack>

      {notice.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: "center" }}>등록된 공지가 없습니다.</Paper>
      ) : (
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성일</TableCell>
              <TableCell>수정일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notice.map((n) => (
              <TableRow key={n.notice_id} hover component={Link} to={`/notice/${n.notice_id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <TableCell>{n.notice_id}</TableCell>
                <TableCell>{n.title}</TableCell>
                <TableCell>{new Date(n.created_at).toLocaleString("ko-KR",{ timeZone: "Asia/Seoul"})}</TableCell>
                <TableCell>{n.updated_at ? new Date(n.updated_at).toLocaleString("ko-KR",{ timeZone: "Asia/Seoul"}):""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Stack>
  );
   
};
