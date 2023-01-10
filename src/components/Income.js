import React, { useEffect, useRef, useState } from 'react'
import './Income.css'

export default function Income(props) {
  const [title, setTitle] = useState('kldmflkdm')
  const [amount, setAmount] = useState('')
  const [detail, setDetail] = useState('')
  const [type, setType] = useState('income')
  const [addedat, setAddedat] = useState('');
  const dateInputRef = useRef(null);
  
  useEffect(()=>{
    console.log('typim degisti')
  }, [type])


  return (

        <div className='input-content'>
        <div className='input-box'>
          <div className='input-number'> 
            <label>Write down an amount</label>
            <input 
              placeholder='$'
              type='text'
              value={amount}
              onChange={(e)=>{
                setAmount(e.target.value)
              }}
            />
          </div>

          <div className='input-detail'> 
            <label>Details</label>
            <br/>
            <input 
              placeholder='pay-check'
              type='text'
              value={detail}
              onChange={(e)=>{
                setDetail(e.target.value)
              }}
            />
          </div>

        </div>

        <div className='input-box'>
          <label>Date  </label>
          <br/>
          <input
            className='input-date'
            type="date"
            onChange={(e)=>{
              setAddedat(e.target.value)
            }}
            ref={dateInputRef}
          />
        </div>

        <div className='select-box'>
        <select title={title} onChange={(e)=>{setType(e.target.value)}}>
            <option value='income'>Income</option>
            <option value='expense'>Expense</option>
        </select>
        </div>

        <div className='button-box'>

          <button 
            className='button'
            onClick={(e)=>{
              e.preventDefault()
              props.newBudget(amount, detail, type, addedat)
              setAmount('')
              setDetail('')
            }}
              > Submit 
          </button>
        </div>
        </div>


    
  )
}
