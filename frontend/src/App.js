import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Title from './lib/components/form';
import List from './lib/components/list';
import Login from './lib/components/login';
import Footer from './lib/components/footer';
import SearchField from './lib/components/search';

import './App.css';


export default function App() {
  const [selected, setSelected] = useState(null)
  const [ajout, setAjout] = useState([]) 
  const [items, onFilter] = useState([]) 

     useEffect(() => {
      fetchTodo()
    }, []);

    

 const fetchTodo = () => {
  axios.get('http://localhost:4200/todo/')
//  .then([]) //   [] permet de regarder qu'une seule fois
//  .then(res => res.json())
  .then(res => {
    console.log(res.data)
    setAjout(res.data.todos)
    onFilter(res.data.todos)
  })
//   .then(setAjout)
  .catch((error) => console.log('error', error))
 }

   return (

    <div className='appjs'>
      <div className='header'>
        <div className='login'>
    <Login/>
        </div>
    <div className='input'>
    <Title test = {ajout} settest = {fetchTodo} selected={selected}/>

    <SearchField  items = {ajout} onFilter={onFilter} /> 
      </div>
    </div>

    <List test = {items} settest = {fetchTodo} edit={setSelected}/>  
    <Footer/>


    </div>
  );
}
