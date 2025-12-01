import React from 'react';
import { Button, Grid, TextField } from '@mui/material';

export default function AddressForm({value,onChange}) {


    const handleFieldChange = (field) =>(e)=>{
       onChange({
        ...value,
        [field]:e.target.value
       });
    };
  
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField 
                label='우편번호' 
                fullWidth
                value={value.zipcode}
                onChange={handleFieldChange('zipcode')}/> 
            </Grid>
           

            <Grid item xs={12}>
                <TextField 
                label='주소' 
                fullWidth 
                value={value.addr}
                onChange={handleFieldChange('addr')}/>
            </Grid>

            <Grid item xs={12}>
                <TextField label='상세주소' fullWidth value={value.detailAddr}
                onChange={handleFieldChange('detailAddr')}/>
            </Grid>

            <Grid item xs={12}>
                <TextField label='이름' fullWidth value={value.receiverName}
                onChange={handleFieldChange('receiverName')} />
            </Grid>

            <Grid item xs={12}>
                <TextField label='연락처' fullWidth value={value.receiverPhone}
                onChange={handleFieldChange('receiverPhone')}/>
            </Grid>
        </Grid>
    );
};
