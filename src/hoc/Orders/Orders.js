import React, { useState, useEffect } from 'react'
import axios from '../../components/axios-orders'

import useErrorHandler from '../useErrorHandler/useErrorHandler'

import Order from '../../components/Order/Order'

const Orders = () => {

  const [ orders, setOrders ] = useState([])
  const [ loading, setLoading ] = useState(true)

  useEffect (() => {
    axios.get('/orders-placed.json')
      .then(response => {
        const allOrders = []
        for ( let key in response.data ) {
          const currentData = response.data[key]
          allOrders.push({
            ...currentData,
            id: key,
          })
        }
        return (
          setOrders(allOrders),
          setLoading(false)
        )
      })
      .catch(err => {
        return (
          setLoading(false)
        )
      })
  }, [])

  return (
    <div>
      {
        orders.map( order => {
          return <Order key={ order.id } ingredients={ order.ingredients } price={ order.price } />
        })
      }
    </div>
  )
}

export default useErrorHandler(Orders, axios)
