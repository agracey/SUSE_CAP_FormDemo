import React from 'react'
import PageComponent from '../presentational/PageComponent'
import {GridSection} from '../presentational/Grid'
import styled from 'styled-components'

import ScrollingPicture from '../components/ScrollingPicture'


const FormSection = styled(GridSection)`
  font-size: 32px;
  font-weight: bolder;
  text-align: center;
  color: ${props => props.theme.colors.secondary.pink };
  background-color: ${props => props.theme.colors.secondary.darkBlue };
`


export default class Orders extends PageComponent {
  buildContentTemplate() {
    return [
      "form form form"
    ]
  }

  renderContent() {
    return (
      <>
        <FormSection name="form">
          Orders
        </FormSection>
      </>
    )
  }
}