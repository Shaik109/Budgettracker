
import React from 'react';
import {BrowserRouter, Routes ,Route } from 'react-router-dom'
import Home from './Components/Home/Home';
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import Home2 from './Components/Home/Home 2';


function App() {


  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/Home2' element={<Home2/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
