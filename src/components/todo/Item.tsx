import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as MdIcons from 'react-icons/md'
import * as GrIcons from 'react-icons/gr'
import { ListItemType } from './type/Type'

interface Props{
    itemList: ListItemType
    index: number,
    deletes:(id:number)=>void,
    change:(id:number)=>void
}
interface Done{
    done:boolean
}

export default function Item({itemList, index, deletes,change}:Props) {
    const [done,setDone] = useState(false)
    useEffect(()=>{
        setDone(itemList.complete)
    },[itemList.complete])
    const changeDone = () =>{
        change(index)
    }

  return (
    <ItemStyled done={done}>
        <p>{itemList.title}</p>
        <div className='buttons'>
            <GrIcons.GrCompliance onClick={()=>changeDone()} />
            <MdIcons.MdModeEditOutline />
            <MdIcons.MdDelete onClick={()=>deletes(index)}/>
        </div>
    </ItemStyled>
  )
}
const ItemStyled = styled.div<Done>`
    /* background-color: #eee2e2; */
    background-color: ${({done})=>done?"#13C9BE":"#eee2e2"};
    padding: 15px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    /* transition: all .3s; */
    p{
        font-size: 1.2rem;
        /* background-color: red; */
        max-width: 85%; 
        word-break: break-all; //TODOfaz o texto quebrar a linha quando chega no limite
    }
    .buttons{
        display: flex;
        gap: 5px;
        font-size: 1.1rem;
    }
`
