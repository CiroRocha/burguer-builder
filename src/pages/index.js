import React from "react"
// import { Route, Switch } from 'react-router-dom'

// import Checkout from '../hoc/Checkout/Checkout'
import Layout from '../hoc/Layout/Layout'
import BurguerContainer from '../hoc/BurguerContainer/BurguerContainer'

const IndexPage = () => (
  <Layout>
    <BurguerContainer />
    {/* This would be used if react router was the main routing here, which it is not. Gatsby takes care of routing */}
    {/* <Switch>
      <Route path='/checkout' component={ Checkout } />
      <Route path='/' exact component={ BurguerContainer } />
    </Switch> */}
  </Layout>
)

export default IndexPage
