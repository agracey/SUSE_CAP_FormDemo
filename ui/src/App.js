import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "/gql"
});

import styled, {ThemeProvider} from 'styled-components'
import theme from './theme.js'

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props=>props.theme.colors.mono.white};
  overflow: auto;
`

import Contact from './pages/Contact'


export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Background>
            <Route path="/" component={Contact} />
          </Background>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}