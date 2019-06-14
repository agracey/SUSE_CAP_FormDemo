import React from 'react'
import PageComponent from '../presentational/PageComponent'
import {GridSection} from '../presentational/Grid'
import Icon from '../presentational/Icon'

import styled from 'styled-components'

import ScrollingPicture from '../components/ScrollingPicture'


const BrandSection = styled(GridSection)`
  font-size: 32px;
  font-weight: bolder;
  text-align: center;
  color: ${props => props.theme.colors.secondary.pink };
  background-color: ${props => props.theme.colors.secondary.darkGreen };

  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`

const OfferSection = styled(GridSection)`
  font-size: 64px;
  font-weight: bolder;
  color: ${props => props.theme.colors.secondary.darkBlue };
  background-color: ${props => props.theme.colors.secondary.blueGreen };
`

const LocationSection = styled(GridSection)`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.colors.secondary.darkPurple };
  background-color: ${props => props.theme.colors.mono.lightGrey };

  & > * {
    float:left;
  }

  & > .finance {
    width: 60%
  }
  
`

const Location = styled.div`
  width 20%;
  padding-top:24px;
  padding-bottom:26px;

  & span {
    width 100%;
    float: left;
  }

  & div span {
    width 100%;
    float: left;
    padding: 2px;
    font-weight: initial;
  }
`

const SocialMedia = ()=>((
  <div>

<Icon name="facebook" size="24"  float="center"/>
         <Icon name="twitter" size="24"  float="center"/>
         <Icon name="pinterest" size="24"  float="center"/>
         <Icon name="insta" size="24"  float="center"/>
         <Icon name="youtube" size="24"  float="center"/>
         <Icon name="tumblr" size="24" float="center"/>
         </div>
))


export default class Home extends PageComponent {
  buildContentTemplate() {
    return [
      "pictures pictures brand", 
      "offers offers offers", 
      "location location location", 
    ]
  }

  renderContent() {
    return (
      <>
        <BrandSection name="pictures">
            <ScrollingPicture />
        </BrandSection>
        <BrandSection name="brand">
            The Chameleon Emporium 
            <img src="/images/chameleon_icon.png" />
        </BrandSection>
        <OfferSection name="offers">
            <h1>Here are some of our current offers:</h1>
        </OfferSection>
        <LocationSection name="location">
            <Location>
              <span>1234 Fake St</span>
              <span>Some City, ST</span>
              <span>800-555-1234</span>
              <div>
                <span>Mon-Fri 8am-8pm</span>
                <span>Sat-Sun 10am-4pm</span>
              </div>
            </Location>
            <div className="finance">
              <h2>
                Financing Options available! <br/>
                Check us out on social media!
                <SocialMedia />
              </h2>
            </div>
            <Location>
              <span>1234 Fake St</span>
              <span>Some City, ST</span>
              <span>800-555-1234</span>
              <div>
                <span>Mon-Fri 8am-8pm</span>
                <span>Sat-Sun 10am-4pm</span>
              </div>
            </Location>
        </LocationSection>
      </>
    )
  }
}