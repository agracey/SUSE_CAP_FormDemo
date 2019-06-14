import React from 'react'
import styled from 'styled-components'

const Img = styled.img`
  margin: 4px;
`

export default ({name, size, float='left'})=>((
  <Img 
    src={`/images/icons/${name}.svg`}
    width={`${size}px`}
    height={`${size}px`}
    className={`float-${float}`}
    />
))