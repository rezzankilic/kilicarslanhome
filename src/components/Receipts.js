import React, { useEffect, useState } from 'react'
import './Receipts.css'

export default function Receipts(props) {
    const[budgetIsReady, setBudgetIsReady] = useState(false)
    const[budget, setBudget] = useState([])


    useEffect(()=>{
        setBudget(props.data)
        console.log(budget)
        setBudgetIsReady(true)


    },[budgetIsReady])
    
    

  return (
    
  )
}
