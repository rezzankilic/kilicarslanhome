import './App.css';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, json } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

export const LoginContext = createContext();

function App() {
  const [loggedin, setLoggedin] = useState(localStorage.access ? true : false)



  useEffect(()=>{
    function refreshToken(){
      if(localStorage.refresh){
        const url = 'http://localhost:8000/api/token/refresh/'
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            refresh: localStorage.refresh,
          }),
        })
        .then((response)=>{
          return response.json();
        })
        .then((data)=>{
          localStorage.access = data.access;
          localStorage.refresh = data.refresh;
          setLoggedin(true);
        });
      }
    };

    const minute = 1000 * 60;
    refreshToken();
    setInterval(refreshToken, minute * 5);

  }, []);
  
  return (
    <LoginContext.Provider value={[loggedin, setLoggedin]}>
      <div className="App">
        <BrowserRouter>
          <Sidebar />
            <div className='container'>
                <Navbar />
              <Routes>
                <Route path="/" element={ loggedin ? <Home  /> : <Login />} />

                <Route path="/login" element={<Login />} />


                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
        </BrowserRouter>    
      </div>
    </LoginContext.Provider>
  );
}

export default App;
