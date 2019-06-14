import React, {Component} from 'react'

import styled from 'styled-components'

const clone = (a)=>(JSON.parse(JSON.stringify(a)))

export const ResponsiveGrid = styled.div`
  
  max-width: 940px;
  margin: 10px 20px;
  display: grid;
  grid-gap: 0px;
  grid-row-gap: 10px;

  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto ${props => clone(props.gridTemplate).splice(0,2).map(a=>('1fr '))} auto;
  grid-template-areas: ${props => props.gridTemplate.map(a=>('"'+a+'"'))};


  @media screen and (min-width: 600px) {
    margin: 0 auto;
  }
`

export const GridSection = styled.div`
  grid-area: ${ props => props.name };
  padding:16px;
`