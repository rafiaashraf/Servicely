import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import WorkerHome from './components/WorkerHome/WorkerHome'
import CustomerHome from './components/CustomerHome/CustomerHome'

function App() {



  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/CustomerHome' element={<CustomerHome />} />
        <Route exact path='/WorkerHome' element={<WorkerHome />} />
        <Route exact path='/Home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
