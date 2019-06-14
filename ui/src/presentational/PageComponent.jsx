import React, {Component} from 'react'

import { ResponsiveGrid, GridSection} from './Grid'


import Navigation from './Navigation'

import Icon from './Icon'
import HelpSection from './HelpSection'


export default class PageComponent extends Component {
  render() {
    return (<>
      <ResponsiveGrid gridTemplate={this.buildTemplate()} key="nav">
        <GridSection name="navigation">
          <Navigation />
        </GridSection>
        {this.renderContent()}
        {this.renderFooter()}
      </ResponsiveGrid>
    
      <HelpSection 
        content={this.getHelpContent()} 
        title={this.getHelpTitle()} key="help"/>
    </>)
}

  buildTemplate() {
    return ["navigation navigation navigation"]
      .concat(this.buildContentTemplate())
      .concat("copyright copyright social")
  }

  buildContentTemplate() {
    return ["... content content"]
  }

  renderContent() {
    return (
      <GridSection name="content">
        Page Not Found. Click here to go home.
      </GridSection>
    )
  }

  renderFooter() {
    return 
      (<><GridSection name="copyright">
        Copyright 2019 Chameleon Emporium
      </GridSection>
      <GridSection name="social">
         <Icon name="facebook" size="16"  float="right"/>
         <Icon name="twitter" size="16"  float="right"/>
         <Icon name="pinterest" size="16"  float="right"/>
         <Icon name="insta" size="16"  float="right"/>
         <Icon name="youtube" size="16"  float="right"/>
         <Icon name="tumblr" size="16" float="right"/>
      </GridSection>
      </>)
    
  }

  getHelpContent() {
    return (
      <div>
        HELP CONTENT
      </div>
    )
  }
  getHelpTitle() {
    return "Help"
  }
}