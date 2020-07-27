import React from 'react';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

import '../../App.css';


export default function List ({test,settest, edit}){

const update =  (event,index) => {
  if(event){
    console.log(event.target.checked); 
    console.log(index)
    axios.put(`http://localhost:4200/todo/${index}`, {
      check: event.target.checked
    })
    .then(() => {
      console.log('check updated')
     // newTab.push ({check:false, titre : text, date : dateActuelle.toString()}) //id:Math.floor((Math.random() * 100000) + 1),
      settest()
    })
  }
}


    //test[index].check = event.target.checked
    //const newTab =test
  //   const newTab =[...test]  // equivalent à  const newTab = Array.from (test)
  // newTab[index].check = event.target.checked
  // settest(newTab)


const remove =  (index) => {
  console.log('index', index)
  axios.delete(`http://localhost:4200/todo/${index}`)
  .then(() => {
    settest()
    
    console.log('I delete this todo')
  })
}

 const editable = (index) => {
 console.log(test[index])
 //  var newtext = test[index].titre + '1';  //remplacer par la nouvelle valeur du champ de
  edit(test[index])
 //const newTab =[...test]
 //newTab[index].titre= newtext;
 //settest(newTab)

  }

return (  
  <div className='listjs'>
  <Grid container spacing={2}>
    { test ? test.slice(0).reverse().map((item,index) => 
    //item equivalent de test[i]x

    <Grid item xs={24} sm={4}>
    <div className='case' onClick={(event)=> update(event,item._id)}>
        <div className='checkbox'>
        <Checkbox className='checkbox'
        id="checkbox" 
        checked={item.check}
        onChange={(event)=> update(event,item._id)}
        />
         <label htmlFor={item._id}>{item.titre}</label>
         </div>
        <div className='description'>{item.description}
        </div>
        <div className='date'>{item.date}</div>
         
         <div className='actions'>
        <IconButton aria-label="edit" className= 'editButton' onClick={(text) => {console.log("edited");editable(index)}}>
          <EditIcon fontSize="medium" />
        </IconButton>
        
        <IconButton aria-label="delete" className= 'deleteButton' onClick={()=> remove(item._id)}>
          <DeleteIcon fontSize="medium" />
        </IconButton>
        </div>
        
</div>
        </Grid>) : "error"}
  </Grid>
  </div>
  )
  }
