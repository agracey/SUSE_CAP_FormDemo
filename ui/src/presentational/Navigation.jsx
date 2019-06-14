import React, {Component} from 'react'
import {Link } from "react-router-dom"
import styled from 'styled-components'

const Navbar = styled.nav`
  padding-top: 4px;

`

const NavList = styled.ul`
  list-style-type: none;
  margin: auto;
  width: 512px;
`

const NavItem = styled.li`
  float: left;
  width: 96px;
  text-align: center;
  font-family: ${props => props.theme.font.heading};

  background-color: ${props => props.theme.colors.secondary.blueGreen};
  border-left: grey 1px solid;

  &:first-child{
    border-top-left-radius:8px;
    border-bottom-left-radius:8px;
    border-left: none;
  } 
  
  &:last-child{
    border-top-right-radius:8px;
    border-bottom-right-radius:8px;
  }

  padding:8px;
  display:        inline-block;
`

const NavLink = styled(Link)`
color: ${props => props.theme.colors.mono.black};
`
const ExtLink = styled.a`
color: ${props => props.theme.colors.mono.black};
`



const items = [
  {name:'Home', route:'/'},
  {name:'My Orders', route:'/orders'},
  {name:'Blog', route:'/blog',external:true},
  {name:'Contact Us', route:'/contact'}
]

export default class Navigation extends Component {
  render() {
      return (
        <Navbar>
          <NavList>
            {this.renderNavItems()}
          </NavList>
        </Navbar>)
  }

  renderNavItems() {
      return items.map((item)=>{
        return (
          <NavItem key={'rroute'+item.route}>
            {this.renderNavLink(item)}
          </NavItem>)
      })
  }

  renderNavLink(item) {
    return item.external ? 
  <ExtLink href={item.route}>{item.name}</ExtLink> :
      <NavLink to={item.route}>{item.name}</NavLink>
  }
}