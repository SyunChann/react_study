import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const baseURL = process.env.REACT_APP_BACKEND_URL;

export default function NoticeEdit(){
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const { id } = useParams();
    const naviage = useNavigate();

    useEffect(()=>{
        const fetchNotice = async () => {
            try{
                const res = await axios.get(`${baseURL}/api/notice/${id}`);
                const data = res.data.data;


            }catch{

            }
        }
    })




    return (
        <div>
            
        </div>
    );
};

