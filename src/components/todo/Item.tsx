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
    EditItem: (id:number)=>void
}
interface Done{
    done:boolean
}

export default function Item({itemList, index, deletes,change,EditItem}:Props) {
    const [done,setDone] = useState(false)
    useEffect(()=>{
        setDone(itemList.complete)
    },[itemList.complete])

  return (
    <ItemStyled done={done}>
        <p>{itemList.title}</p>
        <div className='buttons'>
            <GrIcons.GrCompliance className='button' onClick={()=>change(index)} />
            <MdIcons.MdModeEditOutline className='button' onClick={()=>EditItem(index)} />
            <MdIcons.MdDelete className='button' onClick={()=>deletes(index)}/>
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
    }
    .buttons{
        display: flex;
        gap: 5px;
        font-size: 1.1rem;
    }
    @media(max-width:450px){
        p{
            font-size: .9rem;
        }
        .button{
            font-size: 1.3rem;
        }
    }
`