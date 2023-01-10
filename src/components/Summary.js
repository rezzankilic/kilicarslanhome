import './Summary.css'

import React, { useEffect, useState } from 'react'

export default function Summary(props) {
  const[income, setIncome] = useState(props.income)
  const[expense, setExpense] = useState(props.expense)
  const balance = income-expense

  useEffect( () => {
    setIncome(props.income);
    setExpense(props.expense);
}, [props.income, props.expense]); 


  return (
    <div className='table'>
      <div className='table-item'>
        <h2> Incomes </h2>
        <p> {income}</p>
      </div>

      <div className='minus'>
        <h1> - </h1>
      </div>

      <div className='table-item'>
        <h2> Expenses  </h2>
        <p> {expense} </p>
      </div>
      <div className='equal'>
      <h1>
        =
      </h1>
      </div>
      <div className='table-item'>
        <h2> Balance</h2>
        <p> {balance} </p>
      </div>
    </div>

  )
}
