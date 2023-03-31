import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Form from '../components/todo/Form'
import Item from '../components/todo/Item'
import { ListItemType } from '../components/todo/type/Type'

export default function HomePage() {
  const [item, setItem] = useState<ListItemType[]>([])
  useEffect(()=>{
    if(!localStorage.getItem('item')){
      localStorage.setItem('item',JSON.stringify([]))
    }else {
      const storage = JSON.parse(localStorage.getItem('item')!)
      console.log(storage.length);
      if(storage.length!==0){
        setItem(storage)
        
      }
    }
  },[])

  const AddList = (newlist: ListItemType) => { //!adcionar novos elementos dentro da lista-----------
    // console.log(newlist);
    setItem([...item, newlist])

  }
  const Delete = (id: number) => { //!deletar elementos dentro da lista-------------------------
    var filter = item.filter((value) => value.id !== id)
    filter.map((value, i) => {
      value.id = i
    })
    setItem(filter)
  }
  const done = (id: number) => { //!Mudar o complete de um elemento------------------------------
    const newList: ListItemType = {
      id: id,
      title: item[id].title,
      complete: !item[id].complete
    }

    const index = item.findIndex((value) => value.id == id)
    const itemlist = [...item]
    itemlist[index] = newList
    setItem(itemlist)
    console.log(item[id].complete);
    // item[id].complete=!item[id].complete

  }

  return (
    <ContainerStyled maxWidth='sm'>
      <Form AddList={AddList} index={item} />
      {item.map((value, i) => {
        return <Item key={i} change={done} deletes={Delete} index={i} itemList={value} />
      })}
    </ContainerStyled>
  )
}

const ContainerStyled = styled(Container)`
  border-radius: 10px;
`