import { Button, Paper, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function NoticeEdit(){
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const { id } = useParams();
    const naviagte = useNavigate();

    useEffect(()=>{
        const fetchNotice = async () => {
            try{
                const res = await axios.get(`${baseURL}/api/notice/${id}`);
                const data = res.data.data;
                setTitle(data.title);
                setContent(data.content);
                

            }catch(err){
                console.error('공지 불러오기 실패',err);
                alert('불러오기 실패')

            }
        };
        fetchNotice();
    },[id])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.patch(`${baseURL}/api/notice/${id}`,{title,content});
            alert('수정 완료');
            naviagte(`/notice/${id}`);
        }catch(err){
            console.error('수정 실패',err);
            alert('수정 실패');
        }
    };
   return (
    <Paper sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        공지 수정
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
          <Button variant="outlined" onClick={() => naviagte(`/notice/${id}`)}>
            취소
          </Button>
          <Button type="submit" variant="contained">
            수정
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};



  

