import { Button, Divider, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_BACKEND_URL;


export default function NoticeDetail(){
    const [notice,setNotice] = useState();
    const navigate = useNavigate();
    const {id} = useParams();
  

    useEffect(()=>{
        const fetchNotice = async () => {
            try{
                const res = await axios.get(`${baseURL}/api/notice/${id}`);
                setNotice(res.data.data);
            }catch(err){
                console.error('상세 불러오기 실패',err)
            }
        };
        fetchNotice();
    },[id]);

     return (
    <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, mt: 4, boxShadow: 3 }}>
      {notice ? (
        <>
    
          <Typography variant="h4" gutterBottom>
            {notice.title}
          </Typography>

   
          <Typography variant="body2" color="text.secondary" gutterBottom>
            작성일: {new Date(notice.created_at).toLocaleString()}
            {notice.updated_at && (
              <> | 수정일: {new Date(notice.updated_at).toLocaleString()}</>
            )}
          </Typography>

          <Divider sx={{ my: 2 }} />


          <Typography variant="body1" sx={{ whiteSpace: "pre-line", mb: 4 }}>
            {notice.content}
          </Typography>


          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => navigate("/notice")}>
              목록
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/notice/edit/${notice.notice_id}`)}
            >
              수정
            </Button>
          </Stack>
        </>
      ) : (
        <Typography align="center" color="text.secondary">
          로딩중...
        </Typography>
      )}
    </Paper>
  );
};

  