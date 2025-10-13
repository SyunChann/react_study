import { Button, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function  NoticeCreate(){
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post(`${baseURL}/api/notice`,{title:title,content:content});
            alert('공지사항 등록 완료');
            navigate('/notice')
   
        }catch(err){
            console.error('공지 등록 실패',err);
            alert('공지 등록 실패');
        }
    };
   return (
    <Paper sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        공지 작성
      </Typography>
      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <TextField
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={6}
          required
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() =>{
               navigate('/notice')
            }}
          >
            취소
          </Button>
          <Button type="submit" variant="contained">
            등록
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );


};

