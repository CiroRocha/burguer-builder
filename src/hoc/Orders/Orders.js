import React, { useEffect } from 'react'
import axios from '../../components/axios-orders'
import { navigate } from '@reach/router'

import { useSelector, useDispatch } from 'react-redux'
import * as orderActions from '../../store/actions/asyncActions/orderActions'

import useErrorHandler from '../useErrorHandler/useErrorHandler'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders = () => {

  const orders = useSelector( state => state.order.orders )
  const loading = useSelector( state => state.order.loadingOrders )
  const token = useSelector( state => state.auth.token )
  const userId = useSelector( state => state.auth.userId )

  const dispatch = useDispatch()

  useEffect (() => {
    if ( !token ) {
      navigate('/')
    }
    dispatch( orderActions.fetchOrders( token, userId ) )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ token, userId ])

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
