import { Button, TextField } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ListItemType } from './type/Type'

interface Props {
  index: ListItemType[],
  AddList: (task: ListItemType) => void,
  SaveChange: (newTitle: string) => void,
  editForId: number,
  edit: boolean
}

export default function Form({ index, AddList, SaveChange, editForId, edit }: Props) {
  const [form, setForm] = useState<string>('') //passar um valor para evitar o erro q ocorre quando você está tentando alterar o valor de um elemento de entrada (input) de não controlado (uncontrolled) para controlado (controlled)
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    try {
      if (edit) {
        let indexTitle = index.filter((value)=>{
          if (value.id==editForId){
            return value
          }
        })
        setTitle(indexTitle[0].title)
      }
    } catch (e) {
      console.log('deletado');
    }
  },[edit])

  const Validation = () => {
    if(!edit){
      if (!form) {
        alert('Digite alguma coisa')
      } else {
        const newTask: ListItemType = {
          id: index.length,
          title: form,
          complete: false
        }
        // setForm("")
        AddList(newTask)
      }
      setForm('')
    }
  }

  const Add = () => {
    Validation()
  }
  const AddEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == 'Enter') {
      Validation()
    }
  }

  return (
    edit ? <StackStyled spacing={2} direction="row">
            <TextField value={title}  onChange={(e) => setTitle(e.target.value)} id="outlined-basic" size='small' label='Edit Task' variant="outlined" style={{ width: "100%" }} onKeyPress={(key) => AddEnter(key)} />
            <Button onClick={() => SaveChange(title)} variant="contained" >
              <img style={{height:'20px'}} src='../../../public/confirm.png'/>
            </Button>
          </StackStyled> :
          <StackStyled spacing={2} direction="row">
            <TextField value={form} onChange={(e) => setForm(e.target.value)} id="outlined-basic" size='small' label="Add tasks" variant="outlined" style={{ width: "100%" }} onKeyPress={(key) => AddEnter(key)} />
            <Button onClick={() => Add()} variant="contained" >+</Button>
          </StackStyled>
  )
}
const StackStyled = styled(Stack)`
    background-color: #eee2e2;
    padding: 10px 10px 10px 10px;
    width: 100%;
    margin-bottom:2.5rem;
`
