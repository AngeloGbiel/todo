import { Container } from '@mui/material'
import { Reorder } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Form from '../components/todo/Form'
import Item from '../components/todo/Item'
import { ListItemType } from '../components/todo/type/Type'

export default function HomePage() {
  const [item, setItem] = useState<ListItemType[]>(JSON.parse(localStorage.getItem('item')!)||[])
  const [edit,setEdit]=useState<boolean>(false)
  const [editForId, setEditForId] = useState<number>(0)

  localStorage.setItem('item', JSON.stringify(item))
  


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
    localStorage.setItem('item', JSON.stringify(filter))
    showValues() //!Chamar a função para deletar os elementos do localStorage dentro do setList
    setEdit(false)
  }
  const done = (id: number) => { //!Mudar o complete de um elemento------------------------------

    const index = item.findIndex((value) => value.id == id)
    const newList: ListItemType = {
      id: id,
      title: item[index].title,
      complete: !item[index].complete
    }
    const itemlist = [...item]
    itemlist[index] = newList
    localStorage.setItem('item', JSON.stringify(itemlist))
    showValues() //!Chamar a função que troca o complete dos elementos do localStorage dentro do setList
  }

  const EditItem = (id:number) =>{
    setEditForId(id)
    setEdit(true)
  }
  const SaveChange = (newTitle:string) =>{
    setEdit(false)
    const index = item.findIndex((value) => value.id == editForId)
    console.log(editForId);
    const newList: ListItemType = {
      id: editForId,
      title: newTitle,
      complete: item[index].complete
    }
    
    const itemlist = [...item]
    itemlist[index] = newList
    console.log(itemlist);
    
    localStorage.setItem('item', JSON.stringify(itemlist))
    showValues()
  }
  return (
    <ContainerStyled maxWidth='sm'>
      <Form edit={edit} editForId={editForId} SaveChange={SaveChange} AddList={AddList} index={item} />
      <Reorder.Group axis='y' values={item} onReorder={setItem}>
        {
          item.map((value, i) => {
            return (
              <ReorderStyled key={value.id} value={value}>
                <Item EditItem={EditItem} key={i} change={done} deletes={Delete} index={value.id} itemList={value} />
              </ReorderStyled>
            )
          })
        }
      </Reorder.Group>
    </ContainerStyled>
  )
}

const ContainerStyled = styled(Container)`
  border-radius: 10px;
`
const ReorderStyled = styled(Reorder.Item)`
  list-style: none;
`