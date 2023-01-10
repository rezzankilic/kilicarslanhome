import React, { useEffect, useCallback, useContext }  from 'react'
import Income from '../components/Income'
import Summary from '../components/Summary'
import { useState } from 'react'
// import { useFetch } from '../Hooks/useFetch'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../App'



export default function Dashboard() {

  const [loggedin, setLoggedin]= useContext(LoginContext);
  const [budget, setBudget] = useState([]);
  const [ready, setReady] = useState(false);
  const [url, setUrl] = useState('http://127.0.0.1:8000/api/budgeting/');
 
  const navigate = useNavigate();

  

  const fetchProducts = useCallback (async () => {

      const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access'),
        },
    })
      const json = await response.json()
      setBudget(json.budgeting)
      setReady(true)
      

    });



  useEffect(() => {
      
        fetchProducts();
  
    }, [localStorage]); 




  console.log(budget)

  function sum(numbers) {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  };
   

  // const [budget, setBudget] = useState([{"id": 1, "amount": "20", "detail": "food", "type": "income", "date":"12.2.2023"}, {"id": 2, "amount": "50", "detail": "go out", "type": "expense", "date":"12.2.2023"}, {"id": 3, "amount": "1000", "detail": "paycheck", "type": "income", "date":"12.2.2023"}, {"id": 4, "amount": "25", "detail": "shoes", "type": "expense", "date":"12.2.2023"}, {"id": 5, "amount": "58", "detail": "hair", "type": "expense", "date":"12.2.2023"}, {"id": 6, "amount": "45", "detail": "gift", "type": "expense", "date":"12.2.2023"}, {"id": 7, "amount": "1200", "detail": "paycheck", "type": "income", "date":"12.2.2023"}])

  const incomeArray = budget.filter(item => item.type.includes("income"));
  const incomeArrayAmount = incomeArray.map((e)=>e.amount)
  const incomeArrayAmountNumber = incomeArrayAmount.map((number) => Number(number) );
  const incomeResult = sum(incomeArrayAmountNumber);
  console.log(incomeResult)

  const expenseArray = budget.filter(item => item.type.includes("expense"));
  const expenseArrayAmount = expenseArray.map((e)=>e.amount)
  const expenseArrayAmountNumber = expenseArrayAmount.map((number) => Number(number) );
  const expenseResult = sum(expenseArrayAmountNumber);
  console.log(expenseResult)

  

  function newBudget(amount, detail, type, addedat){
    const data = {amount:amount, detail:detail, type:type, addedat:addedat};
    fetch(url, {
      method: 'POST',
      headers: {
            'Content-Type' : 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access'),
      },
      body: JSON.stringify(data),
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error('something wrong in post');
      }
      return response.json()
     })
    .then((data)=>{
      console.log(data)
      setBudget([...budget, data.bud])

    }).catch((err)=>{console.log(err)})
  }
  

  return (


    <div className='dashboard'>

      <div className='dashboard-box'>
        <Summary income={incomeResult} expense={expenseResult} />

        <div className='list'>
              {budget && budget.map((d)=>{
                  return (
                      <div key={d.id} className='list-item'>
                          <div className='delete-button'>
                            <p>{d.detail}</p>

                            <button onClick={(e)=>{
                              const url = 'http://127.0.0.1:8000/api/budgeting/' + d.id
                              fetch(url, {
                                method: 'DELETE', 
                                headers:{
                                'Content-Type' : 'application/json',
                                Authorization : 'Bearer ' + localStorage.getItem('access'),
                              }})
                              .then(response => {
                                if(!response.ok){
                                  throw new Error('Something went wrong')
                                }
                                navigate('/')
                                setReady(false)
                              })                           
                              .catch((err)=>{console.log(err)})
                            }}>
                            X
                            </button>

                          </div>
                    
                        <h3 className={d.type === 'income' ? 'income-big' : 'expense-small' }>$ {d.amount}</h3>    
                        <p className='date'>{d.addedat}</p>                 
                      </div>
                  )
              })}
        </div>
        

      </div>


      <div className='income'>
        <Income newBudget={newBudget}/>
      </div>
      
      </div>
  )
}
