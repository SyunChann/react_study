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
            await axios.post ({title,content});
            alert('공지사항 등록 완료');
            navigate('/notice');
        }catch(err){
            console.err(err);
            alert('공지 등록 실패');
        }
    };
 


};

