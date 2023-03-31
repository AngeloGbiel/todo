import { Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ListItemType } from './type/Type'

interface Props{
  index: ListItemType[],
  AddList: (task:ListItemType) => void
}

export default function Form({index,AddList}:Props) {
  const [form,setForm]=useState<string>()
  const Add = () =>{
    if(!form){
      alert('Digite alguma coisa')
    }else{
      const newTask:ListItemType = {
        id:index.length,
        title: form,
        complete: false
      }
      // setForm("")
      AddList(newTask)
    }

  }
  
  return (
    <StackStyled spacing={2} direction="row">
      <TextField onChange={(e)=>setForm(e.target.value)} id="outlined-basic" size='small' label="Add tasks" variant="outlined" style={{width:"100%"}} />
      <Button onClick={Add} variant="contained">+</Button>
    </StackStyled>
  )
}
const StackStyled = styled(Stack)`
    background-color: #eee2e2;
    padding: 10px 10px 10px 10px;
    width: 100%;
    margin-bottom:2.5rem;
`


