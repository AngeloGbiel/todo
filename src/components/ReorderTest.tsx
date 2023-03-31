import { Reorder } from 'framer-motion'
import React, { useState } from 'react'
import styled from 'styled-components'

const StyledList = styled(Reorder.Item)`
  width: 400px;
  height: 80px;
  background-color: red;
  font-size: 2rem;
  margin-bottom: 10px;
`

export default function ReorderTest() {
  const [list,setList] = useState<number[]>([1,2,3,4])
  return(
    <>
      <Reorder.Group axis='y' values={list} onReorder={setList}>
          {list.map((value)=>{
            return(
              <StyledList key={value} value={value}>
                {value}
              </StyledList>
            )
          })}
      </Reorder.Group>  
    </>
  )
}
