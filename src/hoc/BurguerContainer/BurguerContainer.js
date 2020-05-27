import React, { useState } from 'react'

import Burguer from '../../components/Burguer/Burguer'

const BurguerContainer = () => {

  const [ingredients, useIngredients] = useState({
    salad: 1,
    cheese: 2,
    meat: 2,
    bacon: 1,
  })

  return (
    <>
      <Burguer ingredients={ ingredients } />
      <div>Building Controls</div>
    </>
  )
}

export default BurguerContainer