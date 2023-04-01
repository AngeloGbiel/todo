import { Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Form from '../components/todo/Form'
import Item from '../components/todo/Item'
import { ListItemType } from '../components/todo/type/Type'

export default function HomePage() {
  const [item, setItem] = useState<ListItemType[]>([])
  useEffect(() => {
    if (!localStorage.getItem('item')) {
      localStorage.setItem('item', JSON.stringify([]))
    } else {
      setItem(JSON.parse(localStorage.getItem('item')!))
    }
  }, [])

  const showValues = () => {
    setItem(JSON.parse(localStorage.getItem('item')!))
  }

  const AddList = (newlist: ListItemType) => { //!adcionar novos elementos dentro do localStorage-----------
    // setItem([...item, newlist])
    let values = JSON.parse(localStorage.getItem('item')!)
    values.push(newlist)
    localStorage.setItem('item', JSON.stringify(values))
    showValues() //!Chamar a função que adcionar os elementos do localStorage dentro do setList
  }
  const Delete = (id: number) => { //!deletar elementos dentro da lista-------------------------
    var filter = item.filter((value) => value.id !== id)
    filter.map((value, i) => {
      value.id = i
    })
    // setItem(filter)
    localStorage.setItem('item',JSON.stringify(filter))
    showValues() //!Chamar a função para deletar os elementos do localStorage dentro do setList
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
    localStorage.setItem('item',JSON.stringify(itemlist))
    showValues() //!Chamar a função que troca o complete dos elementos do localStorage dentro do setList
    // setItem(itemlist)
    // item[id].complete=!item[id].complete

  }

  return (
    <ContainerStyled maxWidth='sm'>
      <Form AddList={AddList} index={item} />
      {
        item.map((value, i) => {
          return (
            <Item key={i} change={done} deletes={Delete} index={i} itemList={value} />
          )
        })
      }
    </ContainerStyled>
  )
}

const ContainerStyled = styled(Container)`
  border-radius: 10px;
`