import React, { useEffect } from 'react'
import axios from '../../components/axios-orders'

import { useSelector, useDispatch } from 'react-redux'
import * as orderActions from '../../store/actions/asyncActions/orderActions'

import useErrorHandler from '../useErrorHandler/useErrorHandler'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = () => {

  const orders = useSelector( state => state.order.orders )
  const loading = useSelector( state => state.order.loadingOrders )
  const token = useSelector( state => state.auth.token )

  const dispatch = useDispatch()

  useEffect (() => {
    dispatch( orderActions.fetchOrders( token ) )
  }, [])

  return (
    <div>
      { loading ?
          <Spinner />
        :
          orders.map( order => {
            return <Order key={ order.id } ingredients={ order.ingredients } price={ order.price } />
          })
      }
    </div>
  )
}

export default useErrorHandler(Orders, axios)
