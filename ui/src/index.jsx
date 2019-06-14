import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import { ApolloProvider } from 'react-apollo'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


import App from './App'
import client from './config/apollo'

ReactDOM.render(
  <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
  </ApolloProvider>,
  document.getElementById('app')
)

module.hot.accept()